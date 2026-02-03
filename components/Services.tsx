"use client";

import { ArrowDownRight } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[
                "Implants",
                "Root Canal Treatments",
                "Teeth Whitening and Cleaning",
                "Smile Designing",
                "Clear Aligners",
                "Braces",
                "Dentures Complete & Partial",
                "Laminates and Veneers",
                "Tooth Jewellery"
            ].map((service, index) => (
                <div key={index} className="service-item group relative bg-white border-2 border-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[220px] md:min-h-[200px] flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer">
                    <div>
                        <h3 className="text-2xl md:text-3xl text-blue-600 font-medium leading-tight mb-2">
                            {service.split(" ").map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h3>
                        <span className="inline-block md:hidden text-xs font-semibold uppercase tracking-wider text-blue-400 mt-2">Learn More</span>
                    </div>
                    
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-blue-600 group-hover:text-blue-700 transition-colors">
                        <ArrowDownRight size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
