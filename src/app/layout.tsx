import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhruvil Adroja | Full-stack Developer & Security Enthusiast",
  description: "Full-stack developer and security engineer crafting robust backends and dynamic frontends. Specialized in Python, FastAPI, PostgreSQL, and Next.js.",
  keywords: ["Dhruvil Adroja", "Full-stack Developer", "Cyber Security", "FastAPI", "Next.js", "Portfolio"],
  authors: [{ name: "Dhruvil Adroja" }],
  openGraph: {
    title: "Dhruvil Adroja | Portfolio",
    description: "Full-stack developer and security engineer crafting robust backends and dynamic frontends.",
    url: "https://dhruvilcs.vercel.app",
    siteName: "Dhruvil Adroja Portfolio",
    images: [
      {
        url: "/Drivegate.png", // Using a project image as a preview
        width: 1200,
        height: 630,
        alt: "Dhruvil Adroja Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruvil Adroja | Full-stack Developer",
    description: "Full-stack developer and security engineer crafting robust backends and dynamic frontends.",
    images: ["/Drivegate.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
