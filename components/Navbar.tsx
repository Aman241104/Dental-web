"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsapConfig";
import MagneticButton from "./MagneticButton";
import gsap from "gsap";
import { useBooking } from "@/lib/BookingContext";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      delay: 0.5,
    });
  }, { scope: navRef });

  const links = [
    { name: "Home", href: "#hero-section" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Assessment", href: "#assessment" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="absolute top-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <div 
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between w-full max-w-7xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
            <span className="text-navy font-serif text-2xl tracking-tighter font-medium">
                Celestia
            </span>
        </Link>

        {/* Links (Independent Pills) */}
        <div className="hidden md:flex items-center gap-3">
            {links.map((link) => (
                <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="px-6 py-2 rounded-full text-xs font-sans font-medium text-navy/70 border border-navy/10 hover:border-navy/30 hover:bg-navy/[0.02] hover:text-navy transition-all duration-300 cursor-pointer"
                >
                    {link.name}
                </a>
            ))}
        </div>

        {/* CTA */}
        <MagneticButton>
            <button 
                onClick={openBooking}
                className="relative inline-flex items-center justify-center px-8 py-3 bg-navy rounded-full text-xs font-bold text-white uppercase tracking-widest hover:bg-black transition-colors duration-300 shadow-md shadow-navy/20 cursor-pointer"
            >
                 Book Online
            </button>
        </MagneticButton>
      </div>
    </nav>
  );
}
