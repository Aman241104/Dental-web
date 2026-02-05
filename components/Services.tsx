"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import clsx from "clsx";

const servicesData = [
  { title: "Implants", description: "State-of-the-art dental implants to restore your smile and function with natural-looking results." },
  { title: "Root Canal Treatments", description: "Advanced, painless root canal therapy designed to save your natural teeth and relieve discomfort." },
  { title: "Teeth Whitening and Cleaning", description: "Professional scaling and whitening treatments to give you a brighter, healthier, and more confident smile." },
  { title: "Smile Designing", description: "Customized digital smile design makeovers to create the perfect aesthetic harmony for your face." },
  { title: "Clear Aligners", description: "Discreet and comfortable invisible aligners to straighten your teeth without the hassle of metal braces." },
  { title: "Braces", description: "Traditional and ceramic orthodontic solutions for comprehensive bite correction and tooth alignment." },
  { title: "Dentures Complete & Partial", description: "High-quality, comfortable complete and partial dentures to restore your ability to eat and speak with confidence." },
  { title: "Laminates and Veneers", description: "Thin, custom-crafted porcelain shells to transform the shape, color, and size of your teeth instantly." },
  { title: "Tooth Jewellery", description: "Add a unique sparkle to your smile with safe, non-invasive, and stylish tooth crystals." }
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 auto-rows-[minmax(180px,auto)]">
            {servicesData.map((service, index) => {
                const isExpanded = expandedIndex === index;
                return (
                    <div 
                        key={index} 
                        onClick={() => toggleExpand(index)}
                        className={clsx(
                            "service-item group relative p-6 md:p-8 rounded-[2rem] flex flex-col justify-between transition-all duration-500 ease-in-out cursor-pointer hover:shadow-xl",
                            isExpanded 
                                ? "bg-blue-600 text-white" 
                                : "bg-white border-2 border-blue-600 text-navy hover:shadow-blue-900/5"
                        )}
                    >
                        <div className="relative z-10 w-full">
                            <h3 className={clsx(
                                "text-2xl md:text-3xl font-medium leading-tight mb-4 transition-colors",
                                isExpanded ? "text-white" : "text-blue-600"
                            )}>
                                {service.title}
                            </h3>
                            
                            <div className={clsx(
                                "overflow-hidden transition-all duration-500 ease-in-out",
                                isExpanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                            )}>
                                <p className="text-sm md:text-lg leading-relaxed opacity-90 font-sans max-w-xl">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-end mt-4">
                            <span className={clsx(
                                "text-xs font-semibold uppercase tracking-wider transition-opacity duration-300",
                                isExpanded ? "opacity-0" : "text-blue-400 opacity-100 md:opacity-0 group-hover:opacity-100"
                            )}>
                                {isExpanded ? "" : "Learn More"}
                            </span>

                            <div className={clsx(
                                "transition-transform duration-500",
                                isExpanded ? "rotate-0" : "rotate-0"
                            )}>
                                {isExpanded ? (
                                     <ArrowRight size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                                ) : (
                                     <ArrowDownRight size={28} className={clsx("md:w-8 md:h-8 text-blue-600 group-hover:text-blue-700")} strokeWidth={2} />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
}
