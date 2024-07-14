"use client";

import Link from "next/link";

import { useMe } from "@/hooks/payload";
import { faBars, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";

const HeaderLinks = [
	{
		name: "AI 연구소",
		href: "/labs",
	},
	{
		name: "AI Playground",
		href: "/playground",
	},
	{
		name: "블로그",
		href: "https://blog.outta.ai",
	},
];

export function Header() {
	const me = useMe();
	const [menuOpen, setMenuOpen] = useState(false);

	const router = useRouter();

	const [queryClient, _] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnMount: true,
					refetchOnWindowFocus: true,
					refetchOnReconnect: true,
					refetchInterval: false,
				},
			},
		}),
	);

	const params = useSearchParams();
	useEffect(() => {
		if (params.has("logout")) {
			queryClient.invalidateQueries({ exact: true, queryKey: ["me"] });
			router.replace("/");
		}
	}, [router, queryClient, params]);

	return (
		<>
			<header className="w-full max-w-[896px] lg:max-w-none h-28 pt-12 mx-auto lg:px-16 flex items-center">
				<Logo className="ml-[min(48px,5vw)]" />
				<ul className="hidden lg:flex flex-1 justify-center items-center">
					{HeaderLinks.map((link) => (
						<li key={link.name} className="w-32 font-hanamdaum text-center">
							<Link href={link.href}>{link.name}</Link>
						</li>
					))}
				</ul>
				<div className="hidden lg:flex justify-end items-center w-60 h-full mr-[min(48px,5vw)]">
					<UserMenu />
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
					"lg:hidden fixed top-28 left-0 w-full overflow-hidden transition-all duration-700 ease-in-out bg-gradient-to-b from-white/100",
					menuOpen ? "max-h-[1024px] pb-24" : "max-h-0",
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
				{me ? (
					<>
						<li className="w-full font-hanamdaum text-center py-4">
							<Link href="/members/mypage" onClick={() => setMenuOpen(false)}>
								마이 페이지
							</Link>
						</li>
						<li className="w-full font-hanamdaum text-center py-4">
							<Link href="/auth/logout" onClick={() => setMenuOpen(false)}>
								로그아웃
							</Link>
						</li>
					</>
				) : (
					<li className="w-full font-hanamdaum text-center py-4">
						<Link href="/auth/login" onClick={() => setMenuOpen(false)}>
							로그인
						</Link>
					</li>
				)}
			</ul>
		</>
	);
}

export const Fallback = (
	<div className="w-full max-w-[896px] lg:max-w-none h-28 pt-12 mx-auto lg:px-16 flex items-center" />
);
