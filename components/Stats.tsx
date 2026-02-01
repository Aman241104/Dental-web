"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: 1, value: 15, label: "Years of Experience", suffix: "+" },
  { id: 2, value: 5000, label: "Happy Smiles", suffix: "+" },
  { id: 3, value: 5, label: "Star Rating", suffix: ".0" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      stats.forEach((stat) => {
        const element = document.getElementById(`stat-${stat.id}`);
        if (element) {
          gsap.fromTo(
            element,
            { innerText: 0 },
            {
              innerText: stat.value,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 }, // Snap to whole numbers
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%", // Start animation when section is near view
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                element.innerText = Math.ceil(this.targets()[0].innerText).toString();
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent z-20 py-0"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-baseline justify-center">
                <span
                  id={`stat-${stat.id}`}
                  className="text-6xl md:text-7xl font-sans font-light text-blue-600 tracking-tighter"
                >
                  0
                </span>
                <span className="text-6xl md:text-7xl font-sans font-light text-blue-600">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-navy/80 font-medium text-sm md:text-base uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
