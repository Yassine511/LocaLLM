import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocaLLM - Secure On-Premise AI Computing",
  description: "Deploy fine-tuned open-source LLMs on your own infrastructure. Zero data leakage. Full regulatory compliance.",
  keywords: ["AI", "Local LLM", "On-Premise", "GPU", "Privacy", "Security", "Enterprise AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-black text-white antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
