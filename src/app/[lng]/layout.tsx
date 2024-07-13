import type { Metadata } from "next";
import { type PropsWithChildren, Suspense } from "react";

import { Footer } from "@/components/Footer";
import { Fallback, Header } from "@/components/Header";

import "@/app/global.css";
import { Langauges } from "@/lib/i18n";
import { GoogleTagManager } from "@next/third-parties/google";
import RootProviders from "./providers";

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
	openGraph: {
		type: "website",
		locale: "ko-KR",
		images: "https://outta.ai/images/opengraph.png",
	},
};

type Props = {
	params: { lng: string };
};

export default function RootLayout({
	children,
	params: { lng },
}: PropsWithChildren<Props>) {
	return (
		<html lang={lng}>
			<body className="relative">
				<RootProviders>
					<GoogleTagManager
						gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ?? ""}
					/>
					<div className="absolute top-0 left-0 w-full z-50">
						<Suspense fallback={Fallback}>
							<Header />
						</Suspense>
					</div>
					<main className="font-pretendard w-full min-h-dvh overflow-hidden">
						{children}
					</main>
					<Footer />
					{/* <ChannelIO /> */}
				</RootProviders>
			</body>
		</html>
	);
}

export async function generateStaticParams() {
	return Langauges.map((lng) => ({ lng }));
}
