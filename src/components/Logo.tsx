"use client";
import { MouseEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import iconLogo from "../assets/icons/icon_logo.svg";
import iconLogoText from "../assets/icons/icon_logo_text.svg";

export function Logo() {
  const router = useRouter();

  const moveToBrands = (e: MouseEvent) => {
    e.preventDefault();
    router.push("/brand");
  };

  return (
    <Link
      href="/"
      className="w-full lg:w-60 flex items-center m-0 ml-[min(48px,5%)]"
      onContextMenu={moveToBrands}
    >
      <Image src={iconLogo} alt="OUTTA Logo" className="w-10 h-10 mx-4" />
      <Image src={iconLogoText} alt="OUTTA Text Logo" className="shrink-0" />
    </Link>
  );
}
