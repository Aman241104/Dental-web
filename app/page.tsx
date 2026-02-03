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
  title: "Best Dentist in Ahmedabad | Chahana Dental Studio | Luxury Cosmetic Clinic",
  description: "Experience pain-free dentistry at Chahana Dental Studio, Ahmedabad's premier luxury clinic. Specializing in Laser RCT, Digital Smile Design, and Implants. 7+ years of expertise.",
  openGraph: {
    title: "Chahana Dental Studio | Luxury Boutique Tech Dentistry",
    description: "Where luxury meets technology. Transform your smile with Ahmedabad's leading cosmetic specialists.",
    url: "https://chahanadentalstudio.com",
    siteName: "Chahana Dental Studio",
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
    title: "Chahana Dental Studio | Best Dentist in Ahmedabad",
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
