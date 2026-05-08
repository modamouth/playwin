import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlayWin Campaign Platform MVP",
  description: "Multi-client campaign management platform for playable ads, quizzes, vouchers and leaderboards."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
