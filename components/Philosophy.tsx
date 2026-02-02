"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import MagneticButton from "./MagneticButton";
import { ArrowRight } from "lucide-react";
import ToothModel from "./ToothModel";
import { useBooking } from "@/lib/BookingContext";

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useGSAP(
    () => {
      // 1. Text Reveal Stagger
      gsap.fromTo([textLeftRef.current, textRightRef.current],
        { y: 50, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // 2. Large Watermark Parallax
      gsap.to(".watermark-text", {
          x: -100,
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
          }
      });
      
    },
    { scope: containerRef }
  );

  return (
    <section
      id="philosophy-section"
      className="relative w-full flex justify-center bg-pearl pt-0 pb-0"
    >
      {/* Main Vision Container (Simpler) */}
      <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-between p-8 md:p-16 overflow-hidden">
        {/* Top Gradient Fade for smooth transition */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pearl to-transparent z-20 pointer-events-none" />
        
        {/* Left Content */}
        <div ref={textLeftRef} className="relative z-10 flex-1 flex flex-col items-start space-y-4 max-w-sm pt-8 md:pt-0">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-navy leading-tight tracking-tight">
                Not all smiles <br />
                <span className="text-blue-600">need fixing,</span><br />
                some <br />
                <span className="text-blue-600 font-serif italic">need vision.</span>
            </h2>
            <p className="text-navy/60 text-sm leading-relaxed max-w-[280px]">
                We bring premium orthodontics and aesthetic care to craft smiles that those who seek perfection truly deserve.
            </p>
        </div>

        {/* Center 3D Element (R3F Canvas) */}
        <div className="relative z-10 flex-1 w-full h-[50vh] md:h-[60vh] flex items-center justify-center">
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Environment preset="city" />
                    {/* Reusing the same ToothModel, maybe slightly different scale/rotation if needed */}
                    <ToothModel scale={0.6} /> 
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={-1.5} />
                </Canvas>
            </div>
        </div>

        {/* Right Content */}
        <div ref={textRightRef} className="relative z-10 flex-1 flex flex-col items-end text-right space-y-6 max-w-sm pb-8 md:pb-0">
             <h2 className="text-3xl md:text-4xl font-serif text-navy leading-none">
                Luxury care <br />
                <span className="font-sans font-light">made personal</span>
             </h2>

             <MagneticButton>
                <button 
                  onClick={openBooking}
                  className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/30 cursor-pointer icon-hover-move"
                >
                    Schedule a visit <ArrowRight size={16} />
                </button>
             </MagneticButton>
        </div>

        {/* Background Watermark */}
        <div className="absolute bottom-[-5%] left-0 w-[200%] pointer-events-none select-none opacity-5">
            <span className="watermark-text text-[20vw] font-bold font-sans text-navy whitespace-nowrap leading-none">
                Celestia Smile — Soft. Defined.
            </span>
        </div>
        
        {/* Soft Background Gradient Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-100/50 rounded-full blur-[120px] -z-0" />

      </div>
    </section>
  );
}
