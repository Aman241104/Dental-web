"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "I was looking for a dental clinic I could trust for a long time. I found it at Celestia! Professional approach to every client, quality treatment and pleasant atmosphere make this clinic unsurpassed. Highly recommended!",
    name: "Anna P.",
    role: "Patient",
    initials: "AP"
  },
  {
    id: 2,
    text: "Thanks to Celestia Dental, I regained confidence in myself. Their specialists did a great job with my teeth, and the consultation helped me understand how to care for them properly. Huge thanks for your work!",
    name: "Maxim L.",
    role: "Patient",
    initials: "ML"
  },
  {
    id: 3,
    text: "The level of technology here is incredible. I had a painless root canal treatment and the recovery was instant. The staff is polite and the clinic looks more like a luxury hotel than a hospital.",
    name: "Sarah J.",
    role: "Patient",
    initials: "SJ"
  },
  {
    id: 4,
    text: "Exceptional service from start to finish. The digital smile design preview convinced me to go ahead with veneers, and the result is exactly what I wanted. Worth every penny.",
    name: "David R.",
    role: "Patient",
    initials: "DR"
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Approx card width
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="w-full bg-slate-50 py-24 text-navy select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-sans font-bold uppercase tracking-tight text-navy mb-12">
          Testimonials
        </h2>

        {/* Slider Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="min-w-[85vw] md:min-w-[450px] snap-center bg-white border border-blue-600 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between h-[350px] shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Review Text */}
              <p className="text-lg md:text-xl font-sans leading-relaxed text-navy/80">
                "{item.text}"
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4 mt-6">
                 <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-blue-100">
                    {/* Placeholder image logic or actual image */}
                    {item.id % 2 === 0 ? (
                         <img src={`https://i.pravatar.cc/150?u=${item.name}`} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-blue-600 font-bold text-sm">{item.initials}</span>
                    )}
                 </div>
                 <div>
                     <h4 className="font-bold text-navy text-base">{item.name}</h4>
                 </div>
              </div>
            </div>
          ))}
          
          {/* Spacer to allow last item to be fully viewed if needed */}
          <div className="min-w-[20px] md:hidden" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
            <button 
                onClick={() => scroll("left")}
                className="w-14 h-14 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={() => scroll("right")}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-95"
            >
                <ChevronRight size={24} />
            </button>
        </div>

      </div>
    </section>
  );
}
