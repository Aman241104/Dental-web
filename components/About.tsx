"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Video/Image Enter Animation
      gsap.from(videoRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
        }
      });

      // Text Stagger
      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full min-h-screen flex items-center bg-slate-50 text-navy overflow-hidden py-0"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Transparent Video Placeholder */}
        <div ref={videoRef} className="relative h-[600px] w-full flex items-center justify-center">
            <div className="relative w-full h-full bg-white rounded-[2.5rem] border border-blue-100 flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-900/5">
                <span className="text-blue-900/40 font-mono text-center px-4">
                    [Transparent Video Placeholder]<br/>
                    Dentist walking onto frame.<br/>
                    (HEVC/WebM Alpha)
                </span>
                
                {/* Fallback Image / Visual rep */}
                 <div className="absolute bottom-0 w-3/4 h-3/4 bg-blue-50/50 rounded-t-full blur-xl" />
            </div>
        </div>

        {/* Content */}
        <div ref={textRef} className="relative z-10 space-y-8">
            <h5 className="text-blue-600 uppercase tracking-widest font-sans font-bold text-sm">The Specialist</h5>
            <h2 className="text-5xl md:text-7xl font-sans font-bold leading-tight text-navy">
                Dr. A. Sharma <br/>
                <span className="text-blue-600 font-medium text-3xl block mt-2">MDS, Prosthodontist</span>
            </h2>
            <p className="text-xl font-sans text-navy/70 leading-relaxed max-w-lg">
                Merging bio-aesthetics with digital precision. Dr. Sharma approaches every case as a unique architectural challenge, ensuring harmony between function and form.
            </p>
            
            <div className="flex gap-4 pt-4">
                <button className="px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg shadow-blue-600/20">
                    Read Bio
                </button>
            </div>
        </div>

      </div>
    </section>
  );
}
