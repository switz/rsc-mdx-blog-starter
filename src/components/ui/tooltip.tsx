'use client';

import { cn } from '@/lib/utils';
import type { Placement } from '@floating-ui/react';
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useDelayGroup,
  useDelayGroupContext,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import * as React from 'react';

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delay?: SimpleTooltipProps['delay'];
}

export function useTooltip({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
  const { delay } = useDelayGroupContext();
  const id = React.useId();
  const arrowRef = React.useRef(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5 + 7),
      arrow({
        element: arrowRef,
      }),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    delay,
    enabled: controlledOpen == null,
    handleClose: safePolygon(),
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  useDelayGroup(context, {
    // Must be unique
    id,
  });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

export function Tooltip({ children, ...options }: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean; disabled?: boolean }
>(({ children, asChild = false, disabled, ...props }, propRef) => {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  React.useEffect(() => {
    if (disabled) {
      context.setOpen(false);
    }
  }, [disabled]);

  if (disabled) return children;

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props ?? {}),
        // @ts-expect-error ok
        'data-state': context.open ? 'open' : 'closed',
      })
    );
  }

  return (
    <span
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </span>
  );
});

export const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ style, className, ...props }, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!context.open) return null;

    const floatingProps = context.getFloatingProps(props) as any;

    return (
      <FloatingPortal>
        <div
          ref={ref}
          className={cn(
            'z-10 rounded-sm border border-white/5 bg-gray-300 p-1 px-2 text-center text-sm font-medium text-gray-700 shadow-lg',
            className
          )}
          style={{
            ...context.floatingStyles,
            ...style,
          }}
          {...floatingProps}
        >
          {floatingProps.children}
          <FloatingArrow
            ref={context.arrowRef}
            context={context.context}
            strokeWidth={0.5}
            stroke="rgba(255, 255, 255, 0.05)"
            className="fill-gray-300 shadow-lg"
          />
        </div>
      </FloatingPortal>
    );
  }
);

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

TooltipTrigger.displayName = 'TooltipTrigger';
TooltipContent.displayName = 'TooltipContent';
SimpleTooltip.displayName = 'SimpleTooltip';
