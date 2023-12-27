"use client";

import {FirebaseAppProvider} from "reactfire";
import {firebaseConfig} from "@/utils/firebase";

export default function ReactfireProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
}
