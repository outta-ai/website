import Link from "next/link";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		name: "블로그",
		href: "https://blog.outta.ai",
	},
];

export async function Header() {
	return (
		<header className="w-full max-w-[896px] lg:max-w-none h-28 pt-12 mx-auto lg:px-16 flex overflow-hidden items-center bg-white/30">
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
				<FontAwesomeIcon icon={faBars} className="w-6 h-6" />
			</div>
		</header>
	);
}
