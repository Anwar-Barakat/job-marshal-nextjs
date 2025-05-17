import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GuestLayout } from "@/layouts";
import { Toaster } from 'sonner';
import { AuthProvider } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobMarshal - Find Your Next Career Move",
  description: "Discover and apply for the best job opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster />
          <GuestLayout>{children}</GuestLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
// pnpm dlx shadcn@latest add sonner
