import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ThemeInit from "@/components/ThemeInit";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";
import NepaliMaskIntro from "@/components/NepaliMaskIntro";
import { getSettings } from "@/lib/cms/content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = "https://krishals.com.np";

export async function generateMetadata(): Promise<Metadata> {
  const { getSEO } = await import("@/lib/cms/content");
  const seo = await getSEO();
  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: siteUrl,
      siteName: "Krishal Shrestha",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('ks-theme');var p=window.matchMedia('(prefers-color-scheme: light)').matches;var t=s||(p?'light':'dark');if(t==='light'){document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${dmSans.variable} ${instrumentSerif.variable} font-body`}
      >
        <ThemeInit />
        <NepaliMaskIntro
          imageUrl={settings.introImageUrl}
          durationSeconds={settings.introDuration}
          frequency={settings.introFrequency}
          enabled={settings.introEnabled}
        />
        <AmbientBackground />
        <div className="grain-overlay bg-grain" aria-hidden="true" />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
