"use client";

import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

export default function Services() {
  // Removed GSAP animations as requested (no scroll/load animations)

  return (
    <section id="services" className="relative w-full py-0 px-6 md:px-12 bg-slate-50 text-navy overflow-hidden">
      <div className="max-w-7xl mx-auto py-5 md:py-5">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-8">
            <h2 className="text-5xl md:text-8xl font-sans font-bold uppercase leading-none tracking-tight text-navy">
                Services:
            </h2>
            <p className="text-navy/60 max-w-sm text-sm md:text-base leading-relaxed pt-2">
                At our clinic you will find everything for the care of your teeth: from preventive examinations to implantation.
            </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            
            {/* 1. Aesthetic Dentistry */}
            <div className="service-item group relative bg-white border-2 border-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[220px] md:min-h-[320px] flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer">
                <div>
                    <h3 className="text-2xl md:text-3xl text-blue-600 font-medium leading-tight mb-2">Aesthetic<br/>Dentistry</h3>
                    {/* Mobile "Learn More" visual match */}
                    <span className="inline-block md:hidden text-xs font-semibold uppercase tracking-wider text-blue-400 mt-2">Learn More</span>
                </div>
                
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <ArrowDownRight size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                </div>
            </div>

            {/* 2. Prosthetics */}
            <div className="service-item group relative bg-white border-2 border-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[220px] md:min-h-[320px] flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer">
                <div>
                    <h3 className="text-2xl md:text-3xl text-blue-600 font-medium leading-tight mb-2">Prosthetics</h3>
                    <span className="inline-block md:hidden text-xs font-semibold uppercase tracking-wider text-blue-400 mt-2">Learn More</span>
                </div>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <ArrowDownRight size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                </div>
            </div>

            {/* 3. Circle CTA (Pricing) */}
            <div className="service-item relative min-h-[200px] md:min-h-[320px] flex items-center justify-center py-4 md:py-0">
                 <Link href="/pricing" className="group relative w-full aspect-square max-w-[200px] md:max-w-[320px] bg-blue-600 rounded-full flex flex-col items-center justify-center p-8 transition-transform hover:scale-[1.02] shadow-xl shadow-blue-600/20 cursor-pointer">
                     <ArrowDownRight className="text-white w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:rotate-[-45deg] transition-transform duration-300" />
                     <span className="text-white font-medium text-lg md:text-xl">Check Prices</span>
                 </Link>
            </div>

            {/* 4. Orthodontics (Blue Featured) */}
            <div className="service-item group relative bg-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[220px] md:min-h-[320px] flex flex-col justify-between overflow-hidden shadow-lg shadow-blue-600/20 cursor-pointer">
                 {/* Abstract Background */}
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 z-0" />
                 <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl" />
                 
                 {/* Content */}
                 <div className="relative z-10">
                     <h3 className="text-2xl md:text-3xl text-white font-medium leading-tight mb-2">Orthodontics</h3>
                     <span className="inline-block md:hidden text-xs font-semibold uppercase tracking-wider text-blue-200 mt-2">Learn More</span>
                 </div>
                 
                 <div className="absolute z-10 bottom-6 right-6 md:bottom-8 md:right-8 text-white/60 group-hover:text-white transition-colors">
                    <ArrowDownRight size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                </div>
            </div>

            {/* 5. Periodontics */}
            <div className="service-item group relative bg-white border-2 border-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[220px] md:min-h-[320px] flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer">
                <div>
                     <h3 className="text-2xl md:text-3xl text-blue-600 font-medium leading-tight mb-2">Periodontics</h3>
                     <span className="inline-block md:hidden text-xs font-semibold uppercase tracking-wider text-blue-400 mt-2">Learn More</span>
                </div>
                
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <ArrowDownRight size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                </div>
            </div>

            {/* 6. Dental Surgery */}
            <div className="service-item group relative bg-white border-2 border-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[220px] md:min-h-[320px] flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer">
                <div>
                    <h3 className="text-2xl md:text-3xl text-blue-600 font-medium leading-tight mb-2">Dental<br/>Surgery</h3>
                    <span className="inline-block md:hidden text-xs font-semibold uppercase tracking-wider text-blue-400 mt-2">Learn More</span>
                </div>
                
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <ArrowDownRight size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
