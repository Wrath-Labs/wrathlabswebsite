import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow, Grain, ScrollProgress } from "@/components/fx/Atmosphere";
import { content } from "@/content";

const { brand, seo, shared } = content;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: seo.titleDefault,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.name,
    title: seo.titleDefault,
    description: seo.description,
    locale: seo.locale,
    images: [
      {
        url: brand.images.socialPreview,
        width: brand.images.socialPreviewWidth,
        height: brand.images.socialPreviewHeight,
        alt: brand.images.socialPreviewAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: seo.twitter.site,
    creator: seo.twitter.creator,
    title: seo.titleDefault,
    description: seo.description,
    images: [brand.images.socialPreview],
  },
  icons: {
    icon: brand.images.browserTabIcon,
    apple: brand.images.phoneHomeScreenIcon,
  },
  robots: {
    index: seo.indexing.allowIndexing,
    follow: seo.indexing.allowFollowingLinks,
  },
};

export const viewport: Viewport = {
  themeColor: seo.theme.colour,
  // Content files are plain JSON, so the union type is asserted here.
  colorScheme: seo.theme.colourScheme as Viewport["colorScheme"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={seo.language}
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-void">
        <ScrollProgress />
        <Grain />
        <CursorGlow />

        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ember-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          {shared.labels.skipToContent}
        </a>

        <Navbar />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
