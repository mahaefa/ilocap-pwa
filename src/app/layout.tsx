import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ILOCAP | Le sens au centre de votre transformation",
  description: "Conseil en stratégie et transformation digitale. Construire ce qui dure. Transformer ce qui compte.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ILOCAP",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ilocap.com",
    siteName: "ILOCAP",
    title: "ILOCAP | Le sens au centre de votre transformation",
    description: "Conseil en stratégie et transformation digitale.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "ILOCAP - Transformation digitale",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ILOCAP",
    description: "Le sens au centre de votre transformation",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073642",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KEF5H5P9Y9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });
          
          gtag('config', 'G-KEF5H5P9Y9', {
            page_location: window.location.href,
            page_title: document.title,
            send_page_view: false,
            cookie_flags: 'SameSite=None;Secure',
            cookie_expires: 28 * 24 * 60 * 60,
            cookie_update: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            restricted_data_processing: true
          });
        `}
      </Script>
      
      <body className={`${sora.variable} ${manrope.variable} font-[family-name:var(--font-manrope)] antialiased bg-[#F3F1EC]`}>
        {children}
      </body>
    </html>
  );
}