import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

export const dotVariants = cva('w-2 h-2', {
  variants: {
    intent: {
      none: 'bg-white/80 text-bg',
      primary: 'bg-blue-300 text-sky-300',
      warning: 'bg-orange-300',
      success: 'bg-green-300',
      subtlePrimary: '70 bg-blue-500 text-sky-100',
      destructive: 'bg-red-700/40 text-red-400',
      solid: 'border border-blue-700 bg-blue-400 uppercase text-black/80',

      subtleSuccess: 'bg-green-600 text-foreground/80',
      ghost: 'text-sky-50',
      outline: 'border border-white/5',
    },
    variant: {
      default: '',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: '',
    },
    fill: {
      true: 'w-full',
    },
    error: {
      true: 'ring-1 ring-red-500',
    },

    rounded: {
      none: 'rounded-none',
      sm: 'rounded-xs',
      md: 'rounded-md',
      full: 'rounded-full',
    },
    align: {
      left: 'justify-start',
      center: 'justify-center',
    },
  },
  defaultVariants: {
    variant: 'default',
    intent: 'none',
    size: 'default',
    align: 'center',
    rounded: 'full',
  },
});

export interface DotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotVariants> {
  asChild?: boolean;
}

const Dot = React.forwardRef<HTMLDivElement, DotProps>(
  ({ className, variant, fill, intent, size, rounded, align, error, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          dotVariants({ variant, fill, intent, size, align, rounded, error }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Dot.displayName = 'Dot';

export { Dot };
