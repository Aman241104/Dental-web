"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const text = textRef.current;
      if (!button || !text) return;

      const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
      
      const xToText = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yToText = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = button.getBoundingClientRect();
        
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };
        const dist = Math.sqrt(distance.x * distance.x + distance.y * distance.y);

        if (dist < 100) {
            // Magnet ON
            xTo(distance.x * 0.5);
            yTo(distance.y * 0.5);
            
            // Text moves slightly more for depth
            xToText(distance.x * 0.1);
            yToText(distance.y * 0.1);
        } else {
            // Magnet OFF (Reset)
            xTo(0);
            yTo(0);
            xToText(0);
            yToText(0);
        }
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        xToText(0);
        yToText(0);
      };

      window.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef }
  );

  return (
    <div 
        ref={buttonRef} 
        className={`relative inline-block cursor-pointer group ${className}`}
    >
        <div ref={textRef} className="relative z-10 transition-colors duration-300">
            {children}
        </div>
        {/* Optional: Glow or background effect handled by parent or passed className */}
    </div>
  );
}
