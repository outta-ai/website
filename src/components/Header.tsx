import Link from "next/link";

import { Logo } from "./Logo";

const HeaderLinks = [
  {
    name: "AI 연구소",
    href: "/",
  },
  {
    name: "AI Playground",
    href: "/",
  },
  {
    name: "자료",
    href: "/",
  },
];

export function Header() {
  return (
    <header className="w-full max-w-[896px] lg:max-w-none h-16 mt-12 mx-auto lg:px-16 flex overflow-hidden items-center">
      <Logo />
      <ul className="hidden lg:flex flex-1 justify-center items-center">
        {HeaderLinks.map((link) => (
          <li key={link.name} className="w-32 font-hanamdaum text-center">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:block w-60" />
      <div className="block lg:hidden w-16 h-16"></div>
    </header>
  );
}
