import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

export const tagVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap text-center font-medium leading-none tracking-wider',
  {
    variants: {
      intent: {
        none: 'bg-white/80 text-bg',
        primary: 'bg-sky-600/20 text-sky-300',
        subtlePrimary: '70 bg-sky-600/70 text-sky-100',
        destructive: 'bg-red-700/40 text-red-400',
        solid: 'border border-blue-700 bg-blue-400 uppercase text-black/80',

        success: 'bg-green-600/20 text-green-300',
        subtleSuccess: 'bg-green-600 text-foreground/80',
        ghost: 'text-sky-50',
        outline: 'border border-white/5',
      },
      variant: {
        default: '',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-[6px] py-[3px] text-sm',
        sm: 'px-[6px] py-[1px] text-xs',
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
      rounded: 'sm',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, fill, intent, size, rounded, align, error, children, ...props }, ref) => {
    return (
      <span
        className={cn(
          tagVariants({ variant, fill, intent, size, align, rounded, error }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Tag.displayName = 'Tag';

export { Tag };
