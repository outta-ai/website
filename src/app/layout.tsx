import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { ChannelIO } from "@/components/ChannelIO";
import "./global.css";

export const metadata: Metadata = {
	title: "OUTTA",
	description: "OUTTA",
	icons: [
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/icons/favicon-16x16.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/icons/favicon-32x32.png",
		},
		{
			rel: "apple-touch-icon",
			type: "image/png",
			sizes: "180x180",
			url: "/icons/apple-touch-icon.png",
		},
	],
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko-KR">
			<body className="relative">
				<div className="absolute top-0 left-0 w-full z-50">
					<Header />
				</div>
				<main className="font-pretendard w-full min-h-dvh overflow-hidden">
					{children}
				</main>
				<Footer />
				<ChannelIO />
			</body>
		</html>
	);
}
