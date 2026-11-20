import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mahal Welfare Services (Est. 2011) | Mission 3F — Fit • Fast • Focused",
  description:
    "Official Road Safety Education LMS & Awareness Portal by Mahal Welfare Services (Est. 2011). Structured video classrooms, timed 30-MCQ examinations, school coordinator management, and merit reward leaderboards.",
  icons: {
    icon: "/images/mission-3f-icon.png",
    apple: "/images/mission-3f-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-soft-white text-brand-charcoal min-h-screen flex flex-col font-sans selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
