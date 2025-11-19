import React, { useEffect, useRef, useCallback } from "react";

interface ConfettiComponentProps {
  particleCount?: number;
  spread?: number;
  zIndex?: number;
  trigger?: boolean;
}

const ConfettiComponent: React.FC<ConfettiComponentProps> = ({
  particleCount = 500,
  spread = 100,
  zIndex = 99999,
  trigger = false,
}) => {
  const scriptLoaded = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse position
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  useEffect(() => {
    // Add mouse move listener
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const loadConfetti = () => {
      if (scriptLoaded.current) return;

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";

      const callback = () => {
        scriptLoaded.current = true;
        if (trigger && (window as any).confetti) {
          fireConfetti();
        }
      };

      if (script.addEventListener) {
        script.addEventListener("load", callback, false);
      } else if ((script as any).readyState) {
        (script as any).onreadystatechange = callback;
      }

      document.body.appendChild(script);
    };

    loadConfetti();
  }, []);

  const fireConfetti = useCallback(() => {
    if ((window as any).confetti) {
      const { x, y } = mousePosition.current;

      // Convert mouse position to normalized coordinates (0-1)
      const originX = x / window.innerWidth;
      const originY = y / window.innerHeight;

      const scalar = 4;
      const pineapple = (window as any).confetti.shapeFromText({
        text: "🎁",
        scalar,
      });

      //gifts
      (window as any).confetti({
        shapes: [pineapple],
        scalar,
        particleCount: particleCount / 4,
        spread: spread / 1.3,
        zIndex,
        origin: {
          x: originX,
          y: originY + -0.02,
        },
      });
      // confetti
      (window as any).confetti({
        particleCount,
        spread,
        zIndex,
        origin: {
          x: originX,
          y: originY,
        },
      });
    }
  }, [particleCount, spread, zIndex]);

  useEffect(() => {
    if (trigger && scriptLoaded.current) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return null;
};

export default ConfettiComponent;
