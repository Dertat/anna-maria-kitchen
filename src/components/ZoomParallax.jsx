import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { GALLERY_COLLAPSE_EVENT } from '@/lib/galleryScroll';

const MAX_IMAGES = 16;
const SPREAD_SCROLL_START = 0.08;
const SPREAD_SCROLL_END = 1;
const STAGGER_STEP = 0.03;
const SCROLL_SPACER_VH = 200;
const SPREAD_DONE_AT = 0.88;

function getDocumentTop(element) {
  return element.getBoundingClientRect().top + window.scrollY;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function lerp(from, to, progress) {
  return from + (to - from) * progress;
}

function getFlyProgress(scroll, index) {
  const start = SPREAD_SCROLL_START + (MAX_IMAGES - 1 - index) * STAGGER_STEP;
  const end = SPREAD_SCROLL_END;

  if (scroll <= start) return 0;
  if (scroll >= end) return 1;

  return easeOutCubic((scroll - start) / (end - start));
}

function getSpinBoost(index, progress) {
  if (progress <= 0 || progress >= 1) return 0;
  return Math.sin(progress * Math.PI) * (index % 2 === 0 ? 10 : -10);
}

function getScalePop(progress) {
  if (progress <= 0 || progress >= 1) return 0;
  return Math.sin(progress * Math.PI) * 0.055;
}

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

function GalleryStageBackdrop() {
  return (
    <>
      <div className="gallery-stage__glow gallery-stage__glow--accent" aria-hidden />
      <div className="gallery-stage__glow gallery-stage__glow--navy" aria-hidden />
      <div className="gallery-stage__floor" aria-hidden />
    </>
  );
}

function GalleryCard({ image }) {
  const [src, setSrc] = useState(image.src);

  return (
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
  );
}

function ParallaxLayer({ image, index, scrollYProgress }) {
  const stack = getStackPosition(index);
  const spread = SPREAD_POSITIONS[index] ?? SPREAD_POSITIONS[0];

  const flyProgress = useTransform(scrollYProgress, (scroll) => getFlyProgress(scroll, index));

  const x = useTransform(flyProgress, (progress) => {
    const eased = easeOutCubic(progress);
    return `${lerp(stack.x, spread.x, eased)}vw`;
  });
  const y = useTransform(flyProgress, (progress) => {
    const eased = easeOutCubic(progress);
    return `${lerp(stack.y, spread.y, eased)}vh`;
  });
  const rotate = useTransform(flyProgress, (progress) => {
    const eased = easeOutBack(Math.min(1, progress));
    return lerp(stack.rotate, spread.rotate, eased) + getSpinBoost(index, progress);
  });
  const scale = useTransform(scrollYProgress, (scroll) => {
    const fly = getFlyProgress(scroll, index);
    return lerp(0.94, 1, easeOutBack(Math.min(1, fly))) + getScalePop(fly);
  });
  const layerZ = useTransform(flyProgress, (progress) => {
    if (progress <= 0) return index + 1;
    return MAX_IMAGES * 2 + index + 1;
  });
  const layerDepth = useTransform(flyProgress, (progress) => {
    if (progress <= 0) return index * 2;
    return index * 2 + progress * MAX_IMAGES * 4;
  });

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
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
    >
      <GalleryCard image={image} />
    </motion.div>
  );
}

export function ZoomParallax({ images }) {
  const containerRef = useRef(null);
  const isDoneRef = useRef(false);
  const prevProgressRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const committedScroll = useMotionValue(0);

  const collapseTrack = () => {
    const container = containerRef.current;
    if (!container || isDoneRef.current) return;

    const scrollY = window.scrollY;
    const containerTop = getDocumentTop(container);
    const spacerPx = (SCROLL_SPACER_VH / 100) * window.innerHeight;
    const stickyTravel = scrollY - containerTop;

    if (stickyTravel <= 8 || stickyTravel > spacerPx + 8) return;

    isDoneRef.current = true;

    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    html.style.overflowAnchor = 'none';

    try {
      flushSync(() => {
        setIsDone(true);
      });
      window.scrollTo(0, Math.round(containerTop));
    } finally {
      html.style.scrollBehavior = previousScrollBehavior;
      html.style.overflowAnchor = '';
    }
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const prev = prevProgressRef.current;
    const scrollingUp = latest < prev - 0.0005;
    prevProgressRef.current = latest;

    if (latest > committedScroll.get()) {
      committedScroll.set(latest);
    }

    if (isDoneRef.current || !scrollingUp) return;

    if (committedScroll.get() >= SPREAD_DONE_AT) {
      collapseTrack();
    }
  });

  useLayoutEffect(() => {
    const initial = scrollYProgress.get();
    prevProgressRef.current = initial;

    if (initial > committedScroll.get()) {
      committedScroll.set(initial);
    }
  }, [scrollYProgress, committedScroll]);

  const layers = useMemo(() => images.slice(0, MAX_IMAGES), [images]);

  useEffect(() => {
    layers.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [layers]);

  useEffect(() => {
    const onCollapseRequest = () => {
      if (isDoneRef.current) return;
      isDoneRef.current = true;
      flushSync(() => {
        setIsDone(true);
      });
    };

    window.addEventListener(GALLERY_COLLAPSE_EVENT, onCollapseRequest);
    return () => window.removeEventListener(GALLERY_COLLAPSE_EVENT, onCollapseRequest);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="gallery-stage relative isolate overflow-hidden py-8">
        <GalleryStageBackdrop />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 lg:grid-cols-3 lg:px-8">
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
      </div>
    );
  }

  const stage = (
    <div className="gallery-stage relative isolate flex h-full items-center justify-center overflow-hidden [perspective:1400px] [transform-style:preserve-3d]">
      <GalleryStageBackdrop />
      {layers.map((image, index) => (
        <ParallaxLayer
          key={image.src}
          image={image}
          index={index}
          scrollYProgress={committedScroll}
        />
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative [overflow-anchor:none]">
      <div className={cn('h-screen', isDone ? 'relative' : 'sticky top-0')}>{stage}</div>
      {!isDone && (
        <div
          aria-hidden
          className="pointer-events-none"
          style={{ height: `${SCROLL_SPACER_VH}vh` }}
        />
      )}
    </div>
  );
}
