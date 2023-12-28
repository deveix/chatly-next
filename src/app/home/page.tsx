"use client";

import {useRouter} from "next/navigation";
import {useSigninCheck} from "reactfire";
import {useEffect} from "react";
import ChatPage from "./content";
import Spinner from "@/components/spinner";

const Home = () => {
  const router = useRouter();

  // check user status and redirect if not logged in
  const {status: signInCheckStatus, data: signInCheckResult} = useSigninCheck();
  useEffect(() => {
    if (!signInCheckResult?.signedIn && signInCheckStatus == "success")
      router.push("/sign-in");
  }, [signInCheckStatus, signInCheckResult, router]);

  if (signInCheckStatus !== "success" || !signInCheckResult.signedIn)
    return (
      <div className="flex flex-1 mt-5 justify-center items-center">
        <Spinner size={30} />
      </div>
    );
  return <ChatPage />;
};

export default Home;
