"use client";
import {updateProfile} from "firebase/auth";
import {collection, doc, setDoc} from "firebase/firestore";
import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  Suspense,
} from "react";
import {useFirestore, useUser} from "reactfire";
import Spinner from "./spinner";
import {updateUserDoc} from "@/services/profile";
import {userDocConverter} from "@/types/user/doc";

const EditableUsername = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // show input on double click
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const {status, data: user} = useUser();

  // default text is display name of user
  useEffect(() => {
    if (user?.displayName) setText(user?.displayName);
  }, [user]);

  const firestore = useFirestore();
  const usersCollection = collection(firestore, "users").withConverter(
    userDocConverter
  );
  const updateUsername = async () => {
    if (!user) return;
    setIsEditing(false);

    // update profile
    updateProfile(user!, {
      displayName: text,
    });

    // update user document with name to be visible to other users
    await updateUserDoc(usersCollection, user!, text);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateUsername();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current!.focus();
    }
  }, [isEditing]);

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <>
          <input
            className="block w-full rounded-md border px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={updateUsername}
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
        </>
      ) : (
        <div className="flex justify-center">
          {status !== "success" ? (
            <Spinner type="bounce" />
          ) : (
            <>
              <span>
                {text
                  ? text
                  : user?.displayName
                  ? user?.displayName
                  : "Edit Your Name"}
              </span>
              <button onClick={handleDoubleClick} className="ps-2">
                <Image
                  src="/icons/pencil.svg"
                  alt={"edit"}
                  width={20}
                  height={20}
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableUsername;
