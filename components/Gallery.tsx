"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

const cases = [
  {
    id: 1,
    title: "Veneer Reconstruction",
    before: "/placeholder-before-1.jpg", 
    after: "/placeholder-after-1.jpg",   
  },
  {
    id: 2,
    title: "Full Mouth Rehabilitation",
    before: "/placeholder-before-1.jpg", // Reusing for now as we only have 1 pair
    after: "/placeholder-after-1.jpg",
  },
  {
    id: 3,
    title: "Invisalign Correction",
    before: "/placeholder-before-1.jpg", // Reusing for now
    after: "/placeholder-after-1.jpg",
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (itemX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(itemX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);
    return () => {
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-full select-none cursor-ew-resize overflow-hidden rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5"
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
    >
        {/* AFTER Image (Background) */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
                backgroundImage: `url('${after}')`,
                backgroundColor: '#cbd5e1' // Fallback color
             }}
        />

        {/* BEFORE Image (Clipped overlay) */}
        <div 
            className="absolute inset-0 bg-cover bg-center border-r-2 border-blue-600"
            style={{ 
                backgroundImage: `url('${before}')`,
                backgroundColor: '#94a3b8', // Fallback color
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
        />

        {/* Slider Handle */}
        <div 
            className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize z-20 flex items-center justify-center -ml-[2px]"
            style={{ left: `${sliderPosition}%` }}
        >
             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <MoveHorizontal size={20} className="text-white" />
             </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider pointer-events-none z-10">
            BEFORE
        </div>
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider pointer-events-none z-10">
            AFTER
        </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative w-full bg-slate-50 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-4">Real Results</h2>
            <h3 className="text-4xl md:text-5xl font-sans font-bold text-navy">Confidence Gallery</h3>
        </div>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
            {cases.map((items, index) => (
                <div key={items.id} className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                   {/* Text Content */}
                   <div className={`w-full md:w-1/3 text-center md:text-left ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                        <span className="text-6xl font-serif text-blue-100 absolute -translate-y-12 -translate-x-6 -z-10 font-bold opacity-50">
                            0{index + 1}
                        </span>
                        <h3 className="text-3xl font-serif text-navy mb-6 relative z-10">{items.title}</h3>
                        <p className="text-navy/70 leading-relaxed mb-8">
                            Experience the transformation. Slide to see the detailed reconstruction and aesthetic improvements achieved by our specialists.
                        </p>
                        <div className="h-1 w-20 bg-blue-600/20 rounded-full mx-auto md:mx-0" />
                   </div>

                   {/* Before/After Compoonent */}
                   <div className="w-full md:w-2/3 h-[50vh] min-h-[400px]">
                       <BeforeAfterSlider before={items.before} after={items.after} />
                   </div>
                </div>
            ))}
        </div>
    </section>
  );
}
