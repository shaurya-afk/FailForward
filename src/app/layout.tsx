import type { Metadata } from "next";
import { Crimson_Pro, Source_Sans_3, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

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
  title: "DeadDocs - Learn from Startup Failures",
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
        <body className={`${crimsonPro.variable} ${sourceSans3.variable} ${caveat.variable} font-sans bg-background-cream text-primary`}>
          <Header />
          <main>{children}</main> {/* This is where page content will go */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
