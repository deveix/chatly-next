"use client";
import {AuthProvider, useFirebaseApp} from "reactfire";
import {getAuth} from "firebase/auth";

export default function ReactfireAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth(useFirebaseApp());
  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
}
