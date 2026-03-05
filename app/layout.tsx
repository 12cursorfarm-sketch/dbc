import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David's Betta Care",
  description: "Premium Betta Fish from David's Betta Care",
  openGraph: {
    title: "David's Betta Care",
    description: "Premium Betta Fish from David's Betta Care",
    images: [
      {
        url: '/b3.webp',
        width: 1200,
        height: 630,
        alt: "David's Betta Care",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "David's Betta Care",
    description: "Premium Betta Fish from David's Betta Care",
    images: ['/b3.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script id="lenis-init" strategy="afterInteractive">
          {`
            if (typeof window !== "undefined" && window.Lenis) {
              const lenis = new Lenis()
              if (window.ScrollTrigger) {
                lenis.on('scroll', ScrollTrigger.update)
                gsap.ticker.add((time) => {
                  lenis.raf(time * 1000)
                })
                gsap.ticker.lagSmoothing(0)
              } else {
                function raf(time) {
                  lenis.raf(time)
                  requestAnimationFrame(raf)
                }
                requestAnimationFrame(raf)
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
