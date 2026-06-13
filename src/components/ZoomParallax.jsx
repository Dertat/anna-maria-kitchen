import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const MAX_IMAGES = 16;

// Финальные позиции: хаос, но внутри экрана (vw/vh от центра, градусы)
const SPREAD_POSITIONS = [
  { x: -28, y: -24, rotate: -11 },
  { x: 22, y: -26, rotate: 9 },
  { x: -6, y: -28, rotate: -4 },
  { x: 26, y: -16, rotate: 13 },
  { x: -24, y: -8, rotate: -8 },
  { x: 2, y: -12, rotate: 6 },
  { x: 18, y: -4, rotate: -10 },
  { x: -20, y: 8, rotate: 11 },
  { x: 24, y: 6, rotate: -7 },
  { x: -2, y: 4, rotate: 12 },
  { x: 10, y: 12, rotate: -5 },
  { x: -26, y: 16, rotate: 8 },
  { x: 6, y: 20, rotate: -12 },
  { x: -16, y: 24, rotate: 5 },
  { x: 20, y: 18, rotate: -9 },
  { x: -12, y: -18, rotate: 10 },
];

function getStackPosition(index) {
  const ring = index % 4;
  const layer = Math.floor(index / 4);
  const angle = (index / MAX_IMAGES) * Math.PI * 2 + layer * 0.35;

  return {
    x: Math.cos(angle) * (1.4 + ring * 0.55) + (layer - 1.5) * 0.7,
    y: Math.sin(angle) * (1.1 + ring * 0.45) + (layer - 1.5) * 0.55,
    rotate: (index - (MAX_IMAGES - 1) / 2) * 3,
  };
}

function ParallaxLayer({ image, index, scrollYProgress }) {
  const [src, setSrc] = useState(image.src);
  const stack = getStackPosition(index);
  const spread = SPREAD_POSITIONS[index] ?? SPREAD_POSITIONS[0];

  const x = useTransform(
    scrollYProgress,
    [0, 0.48],
    [`${stack.x}vw`, `${spread.x}vw`],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.48],
    [`${stack.y}vh`, `${spread.y}vh`],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.48],
    [stack.rotate, spread.rotate],
  );
  const scale = useTransform(scrollYProgress, [0, 0.48, 1], [0.94, 1, 1.06]);
  const layerZ = index + 1;
  const layerDepth = index * 2;

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        z: layerDepth,
        zIndex: layerZ,
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
    >
      <div
        className={cn(
          'gallery-card-frame relative aspect-[4/3] h-[18vh] overflow-hidden rounded-premium border border-border sm:h-[20vh] lg:h-[22vh]',
        )}
      >
        <img
          src={src}
          alt={image.alt}
          className="size-full object-cover"
          loading="eager"
          decoding="async"
          onError={() => {
            if (image.fallback && src !== image.fallback) {
              setSrc(image.fallback);
            }
          }}
        />
      </div>
    </motion.div>
  );
}

export function ZoomParallax({ images }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const layers = useMemo(() => images.slice(0, MAX_IMAGES), [images]);

  useEffect(() => {
    layers.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [layers]);

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-8 lg:grid-cols-3 lg:px-8">
        {layers.map((image) => (
          <div
            key={image.src}
            className="gallery-card-frame overflow-hidden rounded-premium border border-border"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 isolate flex h-screen items-center justify-center overflow-hidden bg-background [perspective:1400px] [transform-style:preserve-3d]">
        {layers.map((image, index) => (
          <ParallaxLayer
            key={image.src}
            image={image}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
