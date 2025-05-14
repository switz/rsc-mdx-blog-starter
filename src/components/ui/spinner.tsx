import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('', {
  variants: {
    size: {
      default: 'size-[50px]',
      lg: 'size-[84px]',
      sm: 'size-[28px]',
      xs: 'size-[16px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const Spinner = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<SVGSVGElement> & VariantProps<typeof spinnerVariants>
>(({ className, size }, ref) => (
  <svg
    className={cn(spinnerVariants({ size }), 'Spinner mx-auto text-center', className)}
    ref={ref}
    strokeWidth="8.00"
    viewBox="1.00 1.00 98.00 98.00"
  >
    <path
      fill="green"
      className="stroke-black/20"
      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
    ></path>
    <path
      className="stroke-black/60"
      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
      pathLength="280"
      strokeDasharray="280 280"
      strokeDashoffset="210"
    ></path>
  </svg>
));

Spinner.displayName = 'Spinner';
