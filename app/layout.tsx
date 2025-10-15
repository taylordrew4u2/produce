import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Produce Task Tracker",
  description: "Real-time task management for event producers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
