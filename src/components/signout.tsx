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
import {useAuth, useFirestore, useUser} from "reactfire";
import Spinner from "./spinner";
import {updateUserDoc} from "@/services/profile";
import {userDocConverter} from "@/types/user/doc";
import {useRouter} from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const auth = useAuth();
  const signOut = async () => {
    await auth.signOut();
    router.replace("/");
  };

  return (
    <button
      className="mt-3 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0 disabled:bg-indigo-300"
      onClick={signOut}
    >
      <Image
        src="/icons/logout.svg"
        alt={"Logout"}
        width={14}
        height={14}
        className="me-2"
      />
      <span>{"Sign Out"}</span>
    </button>
  );
};

export default SignOut;
