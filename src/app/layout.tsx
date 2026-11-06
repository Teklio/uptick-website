import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadModal from "@/components/LeadModal";
import { site } from "@/data/site";
import { abs } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

// One geometric typeface for the whole site (headings, nav, body).
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: "%s | " + site.name },
  description: site.description,
  applicationName: site.name,
  keywords: ["web development company", "SaaS development", "custom software development", "dashboard development", "ERP software", "mobile app development", "e-commerce development", "Next.js developers", "MERN stack", "IT company Kerala", "Malappuram"],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website", url: "/", locale: "en_IN", images: [{ url: "/opengraph-image", alt: site.name }] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/opengraph-image"] },
  formatDetection: { telephone: true, email: true, address: true },
};

const orgLd = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": abs("/#organization"),
    name: site.name,
    url: site.url,
    logo: abs("/logo-color.png"),
    image: abs("/opengraph-image"),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: { "@type": "PostalAddress", addressLocality: "Malappuram", addressRegion: "Kerala", addressCountry: "IN" },
    areaServed: "Worldwide",
    sameAs: site.social.map((x) => x.href),
    contactPoint: [{ "@type": "ContactPoint", telephone: site.contact.phone, email: site.contact.email, contactType: "sales", availableLanguage: ["English", "Malayalam", "Hindi"] }],
  },
  { "@context": "https://schema.org", "@type": "WebSite", "@id": abs("/#website"), url: site.url, name: site.name, publisher: { "@id": abs("/#organization") }, inLanguage: "en" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body>
        <JsonLd data={orgLd} />
        {/* animated star dots behind every page */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgb(40_30_120/0.22),transparent_65%)]" />
          <Starfield />
        </div>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppButton />
        <LeadModal />
      </body>
    </html>
  );
}
