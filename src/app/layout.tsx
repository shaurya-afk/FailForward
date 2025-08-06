import type { Metadata } from "next";
import { Crimson_Pro, Source_Sans_3, Caveat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import HealthGuard from "@/components/HealthGuard";
import { NavBar } from "@/components/NavBar";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FailForward - Learn from Startup Failures",
  description: "Share your story, help others avoid the same mistakes. We believe every setback is a stepping stone in disguise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#f59e0b',
          colorText: '#1c1c1c',
          fontFamily: 'var(--font-source-sans-pro)',
          fontFamilyButtons: 'var(--font-source-sans-pro)',
        },
        elements: {
          card: {
            backgroundColor: '#fefef9',
            boxShadow: '0 4px 14px 0 rgb(0 0 0 / 10%)',
            border: '1px solid #e2e8f0'
          },
        }
      }}
    >
      <html lang="en">
        <body className={`${crimsonPro.variable} ${sourceSans3.variable} ${caveat.variable} font-sans bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen`}>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1">
              <HealthGuard>
                {children}
              </HealthGuard>
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
