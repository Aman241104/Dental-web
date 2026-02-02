"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import MagneticButton from "./MagneticButton";
import { ArrowRight, Star } from "lucide-react";
import { useBooking } from "@/lib/BookingContext";

import ToothModel from "./ToothModel";
import Stats from "./Stats";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.5 });

      // 1. Text Blur-in Stagger (Headline)
      tl.fromTo(".hero-line", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );

      // 2. Subtext Fade in
      tl.fromTo(".hero-subtext",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
      
      // 3. CTA & Stats Fade in
      tl.fromTo([".hero-cta", ".hero-stat"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
      );
      
      // Scroll text parallax - Subtle movement of text while scrolling
       gsap.to(textRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true
          }
       });

      // Scroll Background Trigger
      ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          onLeave: () => gsap.to("body", { backgroundColor: "#F8FAFC", color: "#001E3C", duration: 1.5 }),
          onEnterBack: () => gsap.to("body", { backgroundColor: "#020617", color: "#F8FAFC", duration: 1.5 }),
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full pt-32 pb-0 flex flex-col justify-center bg-pearl"
    >
      {/* Hero Container (Simpler - No Overflow Hidden) */}
      <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center">
          
          {/* Background Ambience */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,171,0.05)_0%,transparent_50%)]" />
          {/* Main Hero Background Image Overlay */}
          <div 
            className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none"
            style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }} 
          />
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-multiply bg-repeat pointer-events-none" />

          {/* Wrapper for Grid Layout */}
          <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Left Column: Text Content */}
              <div ref={textRef} className="flex flex-col items-start space-y-8 pt-20 md:pt-0">
                   {/* Headline */}
                   <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tight text-navy will-change-transform">
                      <span className="hero-line block">Exceptional</span>
                      <div className="hero-line flex flex-wrap gap-x-4 items-baseline">
                          <span className="text-blue-600 font-sans font-light tracking-tighter italic">Dental</span>
                          <span className="font-serif">Care</span>
                      </div>
                   </h1>

                   {/* Subtext */}
                   <p className="hero-subtext text-lg md:text-xl font-sans text-navy/70 max-w-md leading-relaxed will-change-transform">
                      With our team of experienced dentists and state-of-the-art technology, we deliver comprehensive treatments.
                   </p>

                   {/* CTA */}
                   <div className="hero-cta pt-4 will-change-transform">
                        <MagneticButton>
                            <button 
                                onClick={openBooking}
                                className="flex items-center gap-4 bg-navy text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg shadow-navy/20 cursor-pointer"
                            >
                                Book Now <ArrowRight size={20} />
                            </button>
                        </MagneticButton>
                   </div>
                   
                   {/* Stats Row */}
                   <div className="hero-stat flex items-center gap-12 pt-12 border-t border-navy/10 mt-8 w-full will-change-transform">
                       <div className="flex items-center gap-4">
                           <span className="text-4xl font-serif text-navy">13</span>
                           <span className="text-sm text-navy/60 font-sans leading-tight">Achieve Your<br/>Dream Smile</span>
                       </div>
                       <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center bg-blue-50">
                                <Star size={16} className="text-blue-600" fill="currentColor" />
                           </div>
                           <span className="text-sm text-navy/60 font-sans leading-tight">Transforming Healthcare<br/>with Technology</span>
                       </div>
                   </div>
              </div>

              {/* Right Column: 3D Centerpiece (R3F Canvas) */}
              <div id="tooth-container" className="relative w-full h-[60vh] md:h-full hidden md:flex items-center justify-center z-50">
                  <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                          <ambientLight intensity={0.6} />
                          <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
                          <Environment preset="city" />
                          <ToothModel />
                          <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={1.5} />
                      </Canvas>
                  </div>
              </div>
          </div>
          
          
          {/* Stats integrated into Hero */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-0">
             <Stats />
          </div>

          {/* Bottom Gradient Fade for smooth transition */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-t from-pearl to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
}
