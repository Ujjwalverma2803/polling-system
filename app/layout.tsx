import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Pulse Poll | Realtime Classroom Polling Platform",
    template: "%s | Pulse Poll",
  },
  description:
    "Pulse Poll is a modern realtime polling platform for classrooms, workshops, and live team sessions with instant results, quiz scoring, and engagement analytics.",
  keywords: [
    "polling system",
    "next.js polling app",
    "realtime classroom polling",
    "student teacher poll app",
    "socket.io quiz platform",
  ],
  applicationName: "Pulse Poll",
  authors: [{ name: "Verma" }],
  creator: "Verma",
  publisher: "Pulse Poll",
  category: "education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Pulse Poll | Realtime Classroom Polling Platform",
    description:
      "Run live polls, quiz rounds, and engagement sessions with join codes, chat, analytics, and leaderboards.",
    url: "/",
    siteName: "Pulse Poll",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse Poll | Realtime Classroom Polling Platform",
    description:
      "A polished realtime polling platform built with Next.js, Tailwind, and Socket.IO.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} min-h-screen bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
