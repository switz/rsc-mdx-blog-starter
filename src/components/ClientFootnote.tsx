'use client';

import {
  useFloating,
  useHover,
  useInteractions,
  autoPlacement,
  safePolygon,
} from '@floating-ui/react';
import {
  m,
  AnimatePresence,
  useAnimate,
  LazyMotion,
  domAnimation,
  AnimationGeneratorType,
} from 'framer-motion';
import React, { useState } from 'react';

export interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const Footnote = ({ index, content, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, animate] = useAnimate();

  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      autoPlacement({
        // alignment: 'start',
      }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const onClick = async () => {
    await animate(ref.current, {
      scale: 1.1,
      textShadow: 'rgba(0,100,255, 0.8) 1px 0 8px',
      // transform: 'rotate(-2deg)',
    });
    await animate(
      ref.current,
      {
        textShadow: 'rgba(255, 0, 0, 0) 1px 0 4px',
        // transform: 'rotate(0deg)',
        scale: 1,
      },
      {
        duration: 2,
      }
    );
  };

  return (
    <>
      <sup
        className="footnote-index cursor-pointer text-xs"
        id={`footnote-${index}`}
        ref={refs.setReference}
        onClick={onClick}
        {...getReferenceProps()}
      >
        {index}
      </sup>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'ease-in-out' as AnimationGeneratorType, duration: 0.2 }}
              ref={refs.setFloating}
              style={floatingStyles}
              className="z-50 inline-flex max-w-[240px] rounded-lg border-2 border-gray-950 bg-gray-900 p-2 shadow-lg xl:hidden"
              {...getFloatingProps()}
            >
              &nbsp; <span>{content || children}</span>
            </m.span>
          )}
        </AnimatePresence>
      </LazyMotion>

      <span className="footnote-content hidden h-0 pt-1 xl:flex" ref={ref}>
        <sup className="footnote-index mt-0.5 text-xs">{index}</sup>
        &nbsp; <span className="text-sm">{content || children}</span>
      </span>
    </>
  );
};

export default Footnote;
