"use client";
import {FirestoreProvider, useFirebaseApp} from "reactfire";
import {getFirestore} from "firebase/firestore";

export default function ReactfireFirestoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const firestore = getFirestore(useFirebaseApp());
  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
}
