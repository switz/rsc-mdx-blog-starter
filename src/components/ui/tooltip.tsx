'use client';

import { cn } from '@/lib/utils';
import {
  Tooltip as CakTooltip,
  TooltipTrigger as CakTooltipTrigger,
  TooltipContent as CakTooltipContent,
  Arrow,
  type Placement,
} from 'css-anchor-kit';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

export type { Placement };

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delay?: { open?: number; close?: number };
}

export function Tooltip({
  children,
  placement = 'top',
  open,
  onOpenChange,
  delay,
  initialOpen,
}: { children: React.ReactNode } & TooltipOptions) {
  return (
    <CakTooltip
      placement={placement}
      offset={12}
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={initialOpen}
      openDelay={delay?.open}
      closeDelay={delay?.close ?? 100}
    >
      {children}
    </CakTooltip>
  );
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean; disabled?: boolean }
>(({ children, asChild = false, disabled, ...props }, ref) => {
  if (disabled) return <>{children}</>;

  return (
    <CakTooltipTrigger as={asChild ? Slot : 'span'} ref={ref} {...props}>
      {children}
    </CakTooltipTrigger>
  );
});
TooltipTrigger.displayName = 'TooltipTrigger';

export const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <CakTooltipContent
        as="span"
        ref={ref}
        className={cn(
          'z-10 rounded-sm border border-white/5 bg-gray-300 p-1 px-2 text-center text-sm font-medium text-gray-700 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
        <Arrow as="span" className="-z-10 size-5 rotate-45 border-b border-r border-white/5 bg-gray-300" />
      </CakTooltipContent>
    );
  }
);
TooltipContent.displayName = 'TooltipContent';

interface SimpleTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: Placement;
  disabled?: boolean;
  delay?: { open?: number; close?: number };
  className?: string;
}

export const SimpleTooltip = ({
  content,
  children,
  position,
  disabled,
  delay,
  className,
}: SimpleTooltipProps) => {
  return (
    <Tooltip placement={position} delay={delay}>
      <TooltipContent>{content}</TooltipContent>
      <TooltipTrigger asChild={!!children} disabled={disabled} className={className}>
        {children}
      </TooltipTrigger>
    </Tooltip>
  );
};
SimpleTooltip.displayName = 'SimpleTooltip';
