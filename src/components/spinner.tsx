"use client";
import React, {useMemo, memo} from "react";
import {ClipLoader, BounceLoader} from "react-spinners";
import colors from "tailwindcss/colors";

type SpinnerProps = {
  type?: string;
  color?: string;
  loading?: boolean;
  size?: number;
};
const Spinner = ({type, color, size = 20, loading = true}: SpinnerProps) => {
  const colorComputed = useMemo(
    () => (color ? color : colors.indigo[500]),
    [color]
  );
  const Component = type === "bounce" ? BounceLoader : ClipLoader;
  return (
    <Component
      color={colorComputed}
      loading={loading}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default memo(Spinner);
