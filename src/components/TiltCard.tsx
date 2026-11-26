import React, { useRef } from 'react';
import { prefersReducedMotion } from '../utils/webglDetect';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  featured?: boolean;
}

export function TiltCard({
  children,
  className = '',
  intensity = 6,
  featured = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * intensity * 2;
    const rotateX = (0.5 - py) * intensity * 2;

    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(360px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255, 37, 37, 0.14), transparent 65%)`;
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  return (
    <div className="perspective-stage h-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`tilt-surface relative h-full overflow-hidden rounded-2xl bg-[#121212] ${
          featured
            ? 'border border-[#FF2525]/45 shadow-[0_0_40px_-14px_rgba(255,37,37,0.35)] hover:border-[#FF2525]/80 hover:shadow-[0_0_48px_-10px_rgba(255,37,37,0.45)]'
            : 'border border-white/10 hover:border-[#FF2525]/50 hover:shadow-[0_0_32px_-12px_rgba(255,37,37,0.32)]'
        } ${className}`}
      >
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}
