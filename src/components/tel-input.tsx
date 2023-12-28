"use client";
import React, {useCallback, useState} from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormTrigger,
} from "react-hook-form";
import {SignInForm} from "@/types/sign-in-form";

interface Props {
  control: Control<SignInForm>;
  trigger: UseFormTrigger<SignInForm>;
  name: any;
  required: boolean;
  errors: FieldErrors<SignInForm>;
}

const TelInput = ({control, trigger, name, required, errors}: Props) => {
  const validatePhoneNumber = useCallback(
    (inputNumber: string, isDirty: boolean, country: any) => {
      // check if not dirty meaning not edited
      if (!isDirty) return true;

      // validate phone wihout country dial code
      if (
        !inputNumber ||
        inputNumber?.replace(country.dialCode, "")?.trim() === ""
      ) {
        return false;
      }
      return true;
    },
    []
  );
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(props) => {
          return (
            <>
              <PhoneInput
                onChange={(e) => {
                  trigger();
                  props.field.onChange(e);
                }}
                inputProps={{
                  id: name,
                  name,
                  autoComplete: "none",
                  className: `bg-gray-50 border border-gray-300 text-gray-900 shadow-sm text-sm rounded-lg focus:border-gray-300 block w-full ps-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white invalid:[&:not(:placeholder-shown):not(:focus)]:!border-red-500 ${
                    props.fieldState.invalid && "border-red-500"
                  }`,
                }}
                buttonClass={`${
                  props.fieldState.invalid && "!border-red-500"
                } !bg-transparent focus:bg-transparent !border-0 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                dropdownClass="!bg-transparent"
                country={"eg"}
                value={props.field.value}
                isValid={(inputNumber, country: any, countries) => {
                  const phoneLength = Math.ceil(
                    (
                      countries.filter(
                        (val: any) => val.dialCode === country.dialCode
                      )[0] as any
                    )?.format.length / 2
                  );

                  return validatePhoneNumber(
                    inputNumber,
                    props.fieldState.isDirty || props.formState.isSubmitted,
                    country
                  );
                }}
              />
            </>
          );
        }}
        rules={{
          required,
        }}
      />

      {errors?.phone && (
        <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {errors?.phone?.message != ""
            ? errors?.phone?.message
            : "Phone Number is required"}
        </span>
      )}
    </>
  );
};

export default TelInput;
