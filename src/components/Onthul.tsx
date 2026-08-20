"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Onthul — laat een blok eenmalig zacht opkomen zodra het in beeld schuift.
 * Zonder JavaScript (of met prefers-reduced-motion) is alles direct
 * zichtbaar; de begintoestand wordt pas ná mount gezet.
 */
export default function Onthul({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"init" | "wacht" | "zichtbaar">("init");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatus("zichtbaar");
      return;
    }
    // Wat bij laden al in beeld staat, niet eerst verbergen (geen flikker).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setStatus("zichtbaar");
      return;
    }
    setStatus("wacht");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStatus("zichtbaar");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const klasse =
    status === "init"
      ? className
      : `onthul ${status === "zichtbaar" ? "onthul-zichtbaar" : ""} ${className}`;

  return (
    <div
      ref={ref}
      style={{ "--onthul-delay": `${delay}ms` } as CSSProperties}
      className={klasse}
    >
      {children}
    </div>
  );
}
