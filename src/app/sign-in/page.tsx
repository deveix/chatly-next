"use client";
import {useEffect} from "react";
import {Controller} from "react-hook-form";
import TelInput from "../../components/tel-input";
import {useRouter} from "next/navigation";
import {useSigninCheck} from "reactfire";
import useSignIn from "@/hooks/use-sign-in";

const SignIn = () => {
  const router = useRouter();

  // check if signed in reroute to home
  const {status, data: signInCheckResult} = useSigninCheck();
  useEffect(() => {
    if (signInCheckResult?.signedIn === true && status == "success")
      router.push("/home");
  }, [status, signInCheckResult, router]);

  // sign in form hook
  const {
    control,
    trigger,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    confirmation,
  } = useSignIn();

  return (
    <main className="flex min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {confirmation ? "Sign in to your account" : "OTP Verification"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {!confirmation ? (
              <>
                <div>
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 19 18"
                      >
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                      </svg>
                    </div>
                    <TelInput
                      control={control}
                      trigger={trigger}
                      name={"phone"}
                      required={true}
                      errors={errors}
                    />
                  </div>
                </div>
                <div id="recaptcha-container"></div>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Code
                  </label>
                </div>
                <div className="mt-2">
                  <Controller
                    name="code"
                    control={control}
                    render={({field}) => (
                      <input
                        {...field}
                        id="code"
                        name="code"
                        type="text"
                        maxLength={6}
                        className={`block w-full rounded-md border px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 ${
                          errors.code && "border-red-500"
                        }`}
                      />
                    )}
                  />

                  {!!errors.code && (
                    <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {errors.code.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            {!!errors.root && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.root.message}
              </span>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:text-gray-100"
                disabled={isSubmitting || status == "loading"}
              >
                {isSubmitting || status == "loading"
                  ? "Loading..."
                  : confirmation
                  ? "Verify"
                  : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
