"use client";

import Link from "next/link";

import { faBars, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { Logo } from "./Logo";

const HeaderLinks = [
	{
		name: "AI 연구소",
		href: "/labs",
	},
	{
		name: "AI Playground",
		href: "/",
	},
	{
		name: "블로그",
		href: "https://blog.outta.ai",
	},
];

export function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<header className="w-full max-w-[896px] lg:max-w-none h-28 pt-12 mx-auto lg:px-16 flex overflow-hidden items-center">
				<Logo className="ml-[min(48px,5%)]" />
				<ul className="hidden lg:flex flex-1 justify-center items-center">
					{HeaderLinks.map((link) => (
						<li key={link.name} className="w-32 font-hanamdaum text-center">
							<Link href={link.href}>{link.name}</Link>
						</li>
					))}
				</ul>
				<div className="hidden lg:block w-60">
					<Link href="/auth/login">로그인</Link>
				</div>
				<div className="flex lg:hidden w-16 h-16 justify-center items-center mr-[min(48px,5%)]">
					<FontAwesomeIcon
						icon={menuOpen ? faChevronUp : faBars}
						className="w-6 h-6"
						onClick={() => setMenuOpen(!menuOpen)}
					/>
				</div>
			</header>
			<ul
				className={classNames(
					"lg:hidden fixed top-28 left-0 w-full overflow-hidden transition-all duration-700 ease-in-out bg-gradient-to-b from-white/0 to-white/30",
					menuOpen ? "max-h-[1024px]" : "max-h-0",
				)}
			>
				{HeaderLinks.map((link) => (
					<li
						key={link.name}
						className="w-full font-hanamdaum text-center py-4"
					>
						<Link href={link.href} onClick={() => setMenuOpen(false)}>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
