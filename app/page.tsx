import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import SmileAssessment from "@/components/SmileAssessment";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dentist in Ahmedabad | Celestia Dental | Luxury Cosmetic Clinic",
  description: "Experience pain-free dentistry at Celestia Dental, Ahmedabad's premier luxury clinic. Specializing in Laser RCT, Digital Smile Design, and Implants. 15+ years of expertise.",
  openGraph: {
    title: "Celestia Dental | Luxury Boutique Tech Dentistry",
    description: "Where luxury meets technology. Transform your smile with Ahmedabad's leading cosmetic specialists.",
    url: "https://celestiadental.com",
    siteName: "Celestia Dental",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Celestia Dental Clinic Interior",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celestia Dental | Best Dentist in Ahmedabad",
    description: "Luxury cosmetic dentistry and implants in Ahmedabad.",
    images: ["/og-image.jpg"],
  },
};









export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Philosophy />
      <Services />
      <About />
      <Gallery />
      <SmileAssessment />
      <Testimonials />
      <ContactFooter />
    </main>
  );
}
