import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SGEAnswerHub from '@/components/SGEAnswerHub';
import DemandPulse from '@/components/DemandPulse';
import SEOFooter from "@/components/SEOFooter";
import CookieConsent from "@/components/CookieConsent";
import ClientWrapper from "@/components/ClientWrapper";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import SovereignExitIntent from "@/components/SovereignExitIntent";
import { ENTITIES } from '@/data/entities';
import { experts } from "@/data/experts";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joyville-homes.com'),
  applicationName: "Joyville Homes",
  title: {
    template: "%s | Joyville Homes Pune",
    default: "Joyville Homes Pune | Shapoorji Pallonji Projects 2026",
  },
  description: "Explore 12 Shapoorji Pallonji Joyville projects in Pune across Hinjewadi, Hadapsar, Bavdhan & Purandar. 1 to 5 BHK flats, villaments & NA villa plots from ₹65L*. Download 2026 Cost Sheets, Master Layouts & Floor Plans.",
  keywords: [
    "Shapoorji Pallonji Pune",
    "Joyville Homes Pune",
    "Joyville Vyomora Hinjewadi",
    "Joyville Sensorium Hinjewadi",
    "Joyville Hadapsar Annexe",
    "Vanaha Bavdhan Pune",
    "Tree Clouds SP Kingstown",
    "The Vastion SP Kingstown",
    "Wildernest SP Kingstown",
    "Shapoorji Treetopia Pune",
    "Shapoorji Pallonji Projects Pune",
    "2 BHK flats in Pune",
    "3 BHK luxury apartments Pune",
    "luxury villas in Pune"
  ],
  openGraph: {
    title: "Joyville Homes Pune | Shapoorji Pallonji Projects 2026",
    description: "Explore 12 Shapoorji Pallonji Joyville projects in Pune across Hinjewadi, Hadapsar, Bavdhan & Purandar. 1 to 5 BHK flats, villaments & NA villa plots from ₹65L*. Download 2026 Cost Sheets, Master Layouts & Floor Plans.",
    url: "https://joyville-homes.com",
    siteName: "Joyville Homes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joyville Homes Pune by Shapoorji Pallonji — Premium 2 & 3 BHK Residences",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyville Homes Pune | Shapoorji Pallonji Projects 2026",
    description: "Explore 12 Shapoorji Pallonji Joyville projects in Pune across Hinjewadi, Hadapsar, Bavdhan & Purandar. 1 to 5 BHK flats, villaments & NA villa plots from ₹65L*. Download 2026 Cost Sheets, Master Layouts & Floor Plans.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "kgXogw_uAx3DlkOTR_Ysq5ZB6Jh_rpezL9F13KvpMro",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'indexifembedded': true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Joyville Homes",
  },
};

export const viewport: Viewport = {
  themeColor: "#D24D14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preload" href="/images/desktop-poster.webp" as="image" type="image/webp" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
        <meta name="geo.position" content="18.5913;73.7389" />
        <meta name="ICBM" content="18.5913, 73.7389" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_META_PIXEL_ID ? (
          <>
            <link rel="preconnect" href="https://connect.facebook.net" />
            <link rel="dns-prefetch" href="https://connect.facebook.net" />
          </>
        ) : null}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        ) : null}
        <link rel="preconnect" href="https://api.whatsapp.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="prefetch" href="/projects" />
        <link rel="prefetch" href="/press-research" />
        <link rel="prefetch" href="/locality/compare" />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: "list",
                  urls: ["/projects", "/locality/compare", "/press-research", "/flats-in-pune"],
                },
                {
                  source: "document",
                  where: {
                    and: [
                      { href_matches: "/projects/*" },
                      { not: { href_matches: ["/projects", "/projects/invest"] } }
                    ]
                  },
                  eagerness: "moderate"
                }
              ],
              prefetch: [
                {
                  source: "document",
                  where: {
                    or: [
                      { href_matches: "/insights/*" },
                      { href_matches: "/location/*" },
                      { href_matches: "/properties/*" }
                    ]
                  },
                  eagerness: "moderate"
                },
                {
                  source: "document",
                  where: {
                    or: [
                      { href_matches: "*?action=schedule-visit" },
                      { href_matches: "*?action=download-brochure" }
                    ]
                  },
                  eagerness: "immediate"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-accent selection:text-white`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://joyville-homes.com/#website",
                "url": "https://joyville-homes.com",
                "name": "Joyville Homes",
                "alternateName": [
                  "Joyville Homes Pune",
                  "Shapoorji Pallonji Joyville",
                  "Joyville Pune"
                ],
                "publisher": { "@id": "https://joyville-homes.com/#organization" },
                "inLanguage": "en-IN",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://joyville-homes.com/projects?search={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "RealEstateAgent",
                "@id": "https://joyville-homes.com/#organization",
                "name": "Shapoorji Pallonji Real Estate Pune",
                "url": "https://joyville-homes.com",
                "logo": "https://joyville-homes.com/logo.png",
                "image": "https://joyville-homes.com/og-image.jpg",
                "legalName": ENTITIES.DEVELOPER.legalName,
                "priceRange": "₹65 Lakhs - ₹6.8 Cr",
                "foundingDate": ENTITIES.DEVELOPER.foundingDate,
                "description": "Official Shapoorji Pallonji Joyville Homes Pune platform. Providing premium 1, 2, 3, 4 & 5 BHK residences, villaments, standalone villas, and NA villa plots across Hinjewadi, Hadapsar, Bavdhan, and Purandar.",
                "telephone": "+912067210000",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "SP Infocity, Phursungi IT Park",
                  "addressLocality": "Pune",
                  "addressRegion": "Maharashtra",
                  "postalCode": "412308",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 18.4900,
                  "longitude": 73.9700
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "09:30",
                  "closes": "18:30"
                },
                "hasMap": "https://www.google.com/search?q=joyville+homes+hinjewadi&sca_esv=4a455b0f3ad2390b&rlz=1C5CHFA_enIN1014IN1014&sxsrf=ANbL-n4Jy1DKQW1N50K2I4DwVCJ3nxTm4w:1781074254163&udm=1&lsack=TgkpavHOCdHm2roPiZ6g4Qg&sa=X&ved=2ahUKEwjxrfPRivyUAxVRs1YBHQkPKIwQjGp6BAgsEAA&biw=1440&bih=778&dpr=2#sv=CAwS3QIKBmxjbF9wdhIbCgNwdnESFENnMHZaeTh4TVhkeGJtNXpaelZ3EoYBCgNscWkSf0NoaHFiM2wyYVd4c1pTQm9iMjFsY3lCb2FXNXFaWGRoWkdsSXRmR3d5dHE3Z0lBSVdpSVFBQkFCR0FBWUFpSVlhbTk1ZG1sc2JHVWdhRzl0WlhNZ2FHbHVhbVYzWVdScGtnRVVZMjl1YzNSeWRXTjBhVzl1WDJOdmJYQmhibmsSegoDdGJzEnNscmY6ITJtNCExZTE3ITRtMiExN20xITFlMiEybTQhMWUxNSE0bTIhMTVtMSExc2hhc18xd2hlZWxjaGFpcl8xYWNjZXNzaWJsZV8xZW50cmFuY2UhMm0xITFlMiEybTEhMWU4ITJtMSExZTMhM3NJQUU9Eh0KAXESGGpveXZpbGxlIGhvbWVzIGhpbmpld2FkaRoSbG9jYWwtcGxhY2Utdmlld2VyGAogu767_gs",
                "sameAs": [
                  ...ENTITIES.DEVELOPER.sameAs,
                  "https://en.wikipedia.org/wiki/Shapoorji_Pallonji_Group",
                  "https://www.wikidata.org/wiki/Q15380",
                  "https://www.wikidata.org/wiki/Q5766299",
                  "https://www.wikidata.org/wiki/Q747099",
                  "https://www.linkedin.com/company/shapoorjipallonjirealestate",
                  "https://www.instagram.com/joyvillehomes",
                  "https://www.youtube.com/c/ShapoorjiPallonjiRealEstate"
                ],
                "mentions": [
                  { "@id": "https://www.wikidata.org/wiki/Q15380", "name": "Pune" },
                  { "@id": "https://www.wikidata.org/wiki/Q5766299", "name": "Hinjewadi" },
                  { "@id": "https://www.wikidata.org/wiki/Q747099", "name": "Real estate" }
                ],
                "knowsAbout": [
                  "Pune Real Estate Market",
                  "Mivan Technology Construction",
                  "NRI Property Investment India",
                  "EDGE Green Building Certification"
                ],
                "memberOf": [
                  { "@type": "Organization", "name": "CREDAI Pune Metro", "url": "https://credaipune.org/" },
                  { "@type": "Organization", "name": "MahaRERA", "url": "https://maharera.mahaonline.gov.in/" }
                ]
              },
              {
                "@type": "AnalysisNewsArticle",
                "@id": "https://joyville-homes.com/#analysis-hub",
                "headline": "Pune Real Estate Market Intelligence and ROI Forecast 2026",
                "author": experts.map(e => ({ "@type": "Person", "name": e.name })),
                "publisher": { "@id": "https://joyville-homes.com/#organization" },
                "datePublished": "2024-01-01",
                "dateModified": new Date().toISOString().split('T')[0]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://joyville-homes.com/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://joyville-homes.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Projects",
                    "item": "https://joyville-homes.com/projects"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Market Insights",
                    "item": "https://joyville-homes.com/insights"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://joyville-homes.com/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Who is the builder of Joyville Pune?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Joyville Pune is developed by Shapoorji Pallonji Real Estate, a highly reputable developer with over 150 years of legacy in construction and real estate in India."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the price of flats in Joyville Hinjewadi?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The price of flats in Joyville Hinjewadi starts from approximately ₹52 Lakhs for 1 BHK, ₹84 Lakhs for 2 BHK, and goes up to ₹1.4 Cr+ for premium 3 BHK duplexes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is Shapoorji Pallonji a reliable developer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Shapoorji Pallonji is one of India's most trusted and reliable real estate developers, renowned for delivering premium, RERA-compliant projects on time."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the RERA registered projects by Joyville?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Key RERA registered Joyville projects in Pune include Joyville Sensorium (Hinjewadi), Joyville Vyomora (Hinjewadi), Joyville Hadapsar Annexe, Joyville Celestia (Hadapsar), and Vanaha (Bavdhan)."
                    }
                  }
                ]
              }
            ]
          })
        }} />
        <noscript>
          <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Joyville Homes Pune by Shapoorji Pallonji</h1>
            <p>Official Joyville Pune platform. Explore premium 2 &amp; 3 BHK flats across Hinjewadi, Hadapsar &amp; Bavdhan.</p>
          </div>
        </noscript>
        <SGEAnswerHub />
        <ClientWrapper>
          <DemandPulse />
          <FloatingWhatsApp />
          <div className="min-h-[100dvh] flex flex-col relative text-foreground w-full overflow-x-hidden">
            <Navigation />
            <main className="flex-grow flex flex-col">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
          <SEOFooter />
          <SovereignExitIntent />
          <CookieConsent />
        </ClientWrapper>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        ) : null}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
