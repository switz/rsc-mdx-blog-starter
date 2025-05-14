import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { BanIcon, Loader, ShoppingBagIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const icons: Record<string, any> = {
  checkout: <ShoppingBagIcon />,
  ban: <BanIcon />,
  processing: <Loader className="animate-[spin_2.5s_linear_infinite]" />,
};

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ring-offset-background gap-2',
  {
    variants: {
      variant: {
        default: 'bg-white text-bg enabled:hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground enabled:hover:bg-destructive/90',
        outline: 'border border-input enabled:hover:bg-accent enabled:hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground enabled:hover:bg-secondary/80',
        ghost: 'enabled:hover:bg-accent enabled:hover:text-accent-foreground',
        link: 'underline-offset-4 enabled:hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        none: '',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const Icon = icons[String(icon)];

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {Icon}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
