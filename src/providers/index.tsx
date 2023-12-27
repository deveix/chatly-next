"use client";

import ReactfireAuthProvider from "./reactfire-auth-provider";
import ReactfireFirestoreProvider from "./reactfire-firestore-provider";
import ReactfireProvider from "./reactfire-provider";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ReactfireProvider>
      <ReactfireAuthProvider>
        <ReactfireFirestoreProvider>{children}</ReactfireFirestoreProvider>
      </ReactfireAuthProvider>
    </ReactfireProvider>
  );
}
