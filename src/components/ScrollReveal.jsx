import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const variants = {
  up: 'scroll-reveal--up',
  down: 'scroll-reveal--down',
  left: 'scroll-reveal--left',
  right: 'scroll-reveal--right',
  scale: 'scroll-reveal--scale',
};

export function ScrollReveal({
  as: Tag = 'div',
  variant = 'up',
  stagger = false,
  className,
  style,
  children,
  ...props
}) {
  const ref = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={cn(
        'scroll-reveal',
        variants[variant],
        stagger && 'scroll-reveal-stagger',
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}
