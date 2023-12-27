import {UserDoc} from "@/types/user/doc";
import {User} from "firebase/auth";
import {CollectionReference, doc, setDoc} from "firebase/firestore";

export const updateUserDoc = async (
  usersCollection: CollectionReference<UserDoc>,
  user: User,
  name: string
) => {
  const userDoc = doc(usersCollection, user!.uid);
  await setDoc(userDoc, {
    name,
  });
};
