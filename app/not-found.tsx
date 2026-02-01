"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import MagneticButton from "@/components/MagneticButton";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!archRef.current || !gapRef.current) return;

    // 1. Floating Animation for the Dental Arch
    gsap.to(archRef.current, {
      y: 20,
      rotation: 2,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // 2. Pulsing Gap Animation
    gsap.to(gapRef.current, {
      opacity: 0.8,
      scale: 1.1,
      boxShadow: "0 0 60px rgba(0, 255, 171, 0.6)",
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // 3. Background subtle pulse
    gsap.to(".bg-glow", {
      scale: 1.2,
      opacity: 0.6,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    
  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-navy overflow-hidden text-pearl selection:bg-mint selection:text-navy"
    >
      {/* Background Environment */}
      <div className="absolute inset-0 z-0">
        <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-900/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      </div>

      {/* Visual Core: The Digital Gap */}
      <div ref={archRef} className="relative z-10 mb-12 transform perspective-1000">
        {/* Abstract Dental Arch */}
        <div className="flex items-center gap-3 md:gap-6 px-8">
            {/* Left Teeth */}
            {[1, 2, 3].map((i) => (
                <div 
                    key={`l-${i}`} 
                    className="w-12 h-16 md:w-20 md:h-28 bg-white/10 backdrop-blur-md rounded-b-2xl border border-white/20 shadow-lg transform origin-top hover:scale-105 transition-transform duration-300"
                    style={{ height: `${120 - i * 10}%`, opacity: 0.8 - i * 0.1 }}
                />
            ))}

            {/* THE GAP */}
            <div className="relative w-16 h-16 md:w-24 md:h-28 flex items-center justify-center">
                <div 
                    ref={gapRef}
                    className="absolute inset-0 rounded-full bg-mint/5 blur-xl opacity-40 border border-mint/10"
                />
                <div className="text-mint/40 font-mono text-xs tracking-widest animate-pulse">
                    404_ERR
                </div>
            </div>

            {/* Right Teeth */}
            {[1, 2, 3].map((i) => (
                 <div 
                    key={`r-${i}`} 
                    className="w-12 h-16 md:w-20 md:h-28 bg-white/10 backdrop-blur-md rounded-b-2xl border border-white/20 shadow-lg transform origin-top hover:scale-105 transition-transform duration-300"
                    style={{ height: `${120 - i * 10}%`, opacity: 0.8 - i * 0.1 }}
                />
            ))}
        </div>
        
        {/* Arch Curve Hint */}
        <div className="absolute top-0 left-0 right-0 h-8 border-t-2 border-white/5 rounded-[50%] -translate-y-4" />
      </div>

      {/* Typography & Message */}
      <div className="relative z-10 text-center space-y-6 max-w-lg px-6">
        <h1 className="text-8xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 tracking-tighter">
            404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-serif text-white">
            We’ve detected a <span className="text-mint italic">gap</span>.
        </h2>
        
        <p className="text-navy-100/60 font-sans text-lg md:text-xl leading-relaxed">
            Unlike a missing tooth, we can't fix this URL. <br className="hidden md:block"/>
            This page seems to have drifted out of alignment.
        </p>

        <div className="pt-8">
            <MagneticButton>
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all group hover:shadow-[0_0_30px_rgba(0,255,171,0.1)] hover:border-mint/30"
                >
                    <ArrowLeft size={20} className="text-mint group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium tracking-wide">Return to Homepage</span>
                </Link>
            </MagneticButton>
        </div>
      </div>
    </main>
  );
}
