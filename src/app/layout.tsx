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
      <body className="relative">
        <div className="absolute top-0 left-0 w-full z-50">
          <Header />
        </div>
        <main className="font-pretendard w-full overflow-auto">{children}</main>
      </body>
    </html>
  );
}
