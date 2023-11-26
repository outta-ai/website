import { Metadata } from "next";
import { PropsWithChildren } from "react";

import "./global.css";

export const metadata: Metadata = {
  title: "OUTTA",
  description: "OUTTA",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
