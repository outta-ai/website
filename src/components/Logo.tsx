"use client";
import { MouseEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import classNames from "classnames";
import IconLogo from "../assets/icons/icon_logo.svg";
import IconLogoText from "../assets/icons/icon_logo_text.svg";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  const router = useRouter();

  const moveToBrands = (e: MouseEvent) => {
    e.preventDefault();
    router.push("/brand");
  };

  return (
    <Link
      href="/"
      className={classNames("w-full lg:w-60 flex items-center m-0", className)}
      onContextMenu={moveToBrands}
    >
      <IconLogo className="w-10 h-10 mx-4" />
      <IconLogoText className="shrink-0" />
    </Link>
  );
}
