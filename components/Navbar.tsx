"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@/lib/gsapConfig";
import MagneticButton from "./MagneticButton";
import gsap from "gsap";
import { useBooking } from "@/lib/BookingContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  // Initial Navbar Entry
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      delay: 0.5,
    });
  }, { scope: navRef });

  // Handle Resize to Auto-Close Menu
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsMobileMenuOpen(false);
        }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isMobileMenuOpen) {
        // Open: Fade in
        gsap.to(menu, {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
        });
        
        // Stagger links
        gsap.fromTo(".mobile-link-item", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1 }
        );
    } else {
        // Close: Fade out
        gsap.to(menu, {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
        });
    }
  }, [isMobileMenuOpen]);

  const links = [
    { name: "Home", href: "#hero-section" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Assessment", href: "#assessment" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Top Gradient Scrim for Visibility */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-[999] pointer-events-none" />

      <nav className="fixed top-4 md:top-8 left-0 right-0 z-[1000] flex justify-center px-4 md:px-6 pointer-events-none">
        <div 
          ref={navRef}
          className="pointer-events-auto flex items-center justify-between w-full max-w-7xl"
        >
          {/* Logo - High Z-index to stay above menu if needed, or menu covers it */}
          <Link href="/" className="flex items-center gap-2 relative z-[1001]">
              <div className={`transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-100'}`}>
                  <Image 
                    src="/logo.png" 
                    alt="Chahana Dental Studio" 
                    width={180} 
                    height={60} 
                    className="h-12 w-auto object-contain"
                    priority
                  />
              </div>
          </Link>

          {/* ================= DESKTOP MENU (UNCHANGED) ================= */}
          <div 
            className="hidden md:flex items-center p-1.5 gap-1 bg-white/80 backdrop-blur-md border border-white/40 shadow-xl shadow-navy/5 rounded-full relative"
            onMouseLeave={() => {
                const bubble = document.getElementById("nav-bubble");
                if(bubble) gsap.to(bubble, { opacity: 0, scale: 0.8, duration: 0.3 });
            }}
          >
              <div 
                id="nav-bubble"
                className="absolute left-0 top-1.5 bottom-1.5 bg-navy rounded-full z-0 opacity-0 pointer-events-none"
                style={{ width: 0 }}
              />
              
              {links.map((link) => (
                  <a 
                      key={link.name} 
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      onMouseEnter={(e) => {
                          const target = e.currentTarget;
                          const bubble = document.getElementById("nav-bubble");
                          const parentParams = target.parentElement?.getBoundingClientRect();
                          const targetParams = target.getBoundingClientRect();
                          
                          if(bubble && parentParams) {
                              gsap.to(bubble, {
                                  x: targetParams.left - parentParams.left,
                                  width: targetParams.width,
                                  opacity: 1,
                                  scale: 1,
                                  duration: 0.4,
                                  ease: "elastic.out(1, 0.75)"
                              });
                          }
                      }}
                      className="relative z-10 px-5 py-2 rounded-full text-xs font-sans font-medium text-navy transition-colors duration-300 hover:text-white cursor-pointer whitespace-nowrap"
                  >
                      {link.name}
                  </a>
              ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton>
                <button 
                    onClick={openBooking}
                    className="relative inline-flex items-center justify-center px-8 py-3 bg-navy rounded-full text-xs font-bold text-white uppercase tracking-widest hover:bg-black transition-colors duration-300 shadow-md shadow-navy/20 cursor-pointer"
                >
                     Book Online
                </button>
            </MagneticButton>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button 
            onClick={toggleMenu}
            className="md:hidden relative z-[1001] w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-navy transition-transform duration-300 active:scale-95 cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[999] bg-white w-full h-[100dvh] flex flex-col items-center justify-center p-6 md:hidden"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            
            {/* Mobile Vertical Pill Nav */}
            <div 
                className="flex flex-col items-center w-full bg-slate-50 border border-navy/5 rounded-[2rem] p-2 relative"
                onMouseLeave={() => {
                    const bubble = document.getElementById("nav-bubble-mobile");
                    if(bubble) gsap.to(bubble, { opacity: 0, scale: 0.8, duration: 0.3 });
                    setActiveLink(null);
                }}
            >
                {/* Floating Pill Background */}
                <div 
                    id="nav-bubble-mobile"
                    className="absolute left-2 right-2 bg-navy rounded-full z-0 opacity-0 pointer-events-none"
                    style={{ height: 0, top: 0 }}
                />

                {links.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href}
                        onClick={(e) => {
                            setActiveLink(link.name);
                            const target = e.currentTarget;
                            const bubble = document.getElementById("nav-bubble-mobile");
                            const parentParams = target.parentElement?.getBoundingClientRect();
                            const targetParams = target.getBoundingClientRect();
                            if(bubble && parentParams) {
                                gsap.to(bubble, {
                                    y: targetParams.top - parentParams.top,
                                    height: targetParams.height,
                                    opacity: 1, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.75)"
                                });
                            }
                            handleScroll(e, link.href);
                        }}
                        onMouseEnter={(e) => {
                            setActiveLink(link.name);
                            const target = e.currentTarget;
                            const bubble = document.getElementById("nav-bubble-mobile");
                            const parentParams = target.parentElement?.getBoundingClientRect();
                            const targetParams = target.getBoundingClientRect();
                            
                            if(bubble && parentParams) {
                                gsap.to(bubble, {
                                    y: targetParams.top - parentParams.top,
                                    height: targetParams.height,
                                    opacity: 1, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.75)"
                                });
                            }
                        }}
                        onTouchStart={(e) => {
                            setActiveLink(link.name);
                             const target = e.currentTarget;
                            const bubble = document.getElementById("nav-bubble-mobile");
                            const parentParams = target.parentElement?.getBoundingClientRect();
                            const targetParams = target.getBoundingClientRect();
                            
                            if(bubble && parentParams) {
                                gsap.to(bubble, {
                                    y: targetParams.top - parentParams.top,
                                    height: targetParams.height,
                                    opacity: 1, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.75)"
                                });
                            }
                        }}
                        className={`mobile-link-item relative z-10 w-full text-center py-4 text-xl font-serif font-medium transition-colors duration-300 rounded-full cursor-pointer ${activeLink === link.name ? 'text-white' : 'text-navy'}`}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="mobile-link-item w-full pt-4">
                <button 
                    onClick={() => {
                        openBooking();
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white rounded-full py-4 text-lg font-medium shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                >
                    Book Appointment
                </button>
            </div>
        </div>
      </div>
    </>
  );
}
