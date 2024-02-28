import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { Header } from "@/components/Header";

import "./global.css";

export const metadata: Metadata = {
  title: "OUTTA",
  description: "OUTTA",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
      <main className="font-pretendard relative w-full">
        <Header />
      </main>
    </html>
  );
}
