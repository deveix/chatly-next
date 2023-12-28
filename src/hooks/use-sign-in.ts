// use-sign-in.ts
import {SignInForm} from "@/types/sign-in-form";
import {useEffect, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from "firebase/auth";
import {useRouter} from "next/navigation";
import {FirebaseError} from "firebase/app";

const useSignIn = () => {
  const router = useRouter();
  const auth = getAuth();

  const {
    control,
    trigger,
    formState: {errors, isSubmitting},
    handleSubmit,
    setError,
  } = useForm<SignInForm>({
    defaultValues: {
      phone: "",
      code: "",
    },
  });
  const [confirmation, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  // Recaptcha
  const verify = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!verify.current) {
      verify.current = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
      verify.current.render();
    }
  }, [auth]);

  // Form Submit
  const onSubmit: SubmitHandler<SignInForm> = async ({phone, code}) => {
    if (confirmation) {
      await validateOtp(code);
    } else {
      if (errors?.phone || !verify.current) return false;

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          `+${phone}`,
          verify.current
        );

        setConfirmationResult(confirmationResult);
      } catch (error: unknown) {
        if (error instanceof FirebaseError)
          setError("phone", {message: "Invalid phone"});
        else setError("root", {message: "Something went wrong!"});
      }
    }
  };

  // Validate OTP
  const validateOtp = async (code?: string) => {
    if (!code) return false;
    try {
      const authResult = await confirmation!.confirm(code);
      // router.push("/home");
      if (!authResult.user) setError("code", {message: "Invalid code."});
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error?.code === "auth/invalid-verification-code") {
          setError("code", {message: "Invalid code."});
        } else if (error?.code === "auth/invalid-app-credential") {
          setError("code", {message: "Something went wrong, Please try again"});
        }
      } else
        setError("code", {message: "Something went wrong, Please try again"});
    }
  };

  return {
    control,
    trigger,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    confirmation,
  };
};

export default useSignIn;
