import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          'h-10 w-full min-w-0 appearance-none rounded-soft border border-input bg-transparent py-2 pr-9 pl-3 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}

export { Select };
