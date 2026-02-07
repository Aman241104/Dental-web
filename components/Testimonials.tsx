"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "I recently visited Chahana Dental Studio for a teeth whitening treatment, and I had an excellent experience. Dr. Chahana Shah and her team were highly professional, knowledgeable, and made me feel comfortable throughout the procedure. The results exceeded my expectations, and I am extremely satisfied with my brighter, healthier smile. I highly recommend Dr. Chahana Shah and her clinic for anyone seeking quality dental care.",
    name: "Jani Vismay",
    role: "Patient",
    initials: "JV"
  },
  {
    id: 2,
    text: "Very professional and skilled, top to bottom. Cannot recommend them more highly. Dr Chahana is thorough and informative, and lets you know every step of the way what's going on so there are no surprises. Very calming as well. Thanks Dr Chahana and the team.",
    name: "Manan Mehta",
    role: "Patient",
    initials: "MM"
  },
  {
    id: 3,
    text: "Best Ambience, Well experience doctor...I went there to get my teeth cleaned, it was great, clean space, well skilled doctor, less fees and it didn't hurt at all and understand my problem and solved very well I suggest all my relatives and friends for any dental issues Thank you to dr chahana",
    name: "H Shah",
    role: "Patient",
    initials: "HS"
  },
  {
    id: 4,
    text: "I had my root canal treatment and wisdom tooth removal surgery done at Chahana Dental Studio by Dr. Chahana, and the experience was excellent. Both procedures were handled very professionally and almost pain free. Dr. Chahana explained everything clearly and made me feel comfortable throughout. The clinic is very clean and hygienic. Highly recommended for anyone looking for safe and quality dental care",
    name: "Parth Kella",
    role: "Patient",
    initials: "PK"
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
              className="min-w-[85vw] md:min-w-[450px] snap-center bg-white border border-blue-600 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Review Text */}
              <p className="text-lg md:text-xl font-sans leading-relaxed text-navy/80">
                &quot;{item.text}&quot;
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4 mt-6">
                 <div className="w-16 h-16 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center border border-blue-100 shrink-0">
                    {/* Placeholder image logic or actual image */}
                     <span className="text-blue-600 font-bold text-lg">{item.initials}</span>
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
