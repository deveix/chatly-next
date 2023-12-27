// use-sign-in.test.ts
import {render, screen, renderHook, act} from "@testing-library/react";
import useSignIn from "@/hooks/use-sign-in";
import {signInWithPhoneNumber} from "firebase/auth";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock("firebase/auth");

describe("useSignIn hook", () => {
  test("should handle form submission and validation", async () => {
    const {result} = renderHook(() => useSignIn());
    await act(async () => {
      await result.current.onSubmit({phone: "201226344312"});
    });
    expect(signInWithPhoneNumber).toHaveBeenCalled();
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.confirmation).not.toBe(null);

    console.log(result.current.confirmation);
  });
});
