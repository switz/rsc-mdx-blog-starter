'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const Footnote = ({ index, content, children }: Props) => {
  const [highlight, setHighlight] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const onClick = async () => {
    if (!ref.current) return;
    setHighlight(true);
    setTimeout(() => setHighlight(false), 2000);
  };

  return (
    <>
      <Tooltip placement="bottom">
        <TooltipContent className="max-w-[240px] xl:hidden">
          {content || children}
        </TooltipContent>
        <TooltipTrigger>
          <sup
            className="footnote-index cursor-pointer text-xs"
            id={`footnote-${index}`}
            onClick={onClick}
          >
            {index}
          </sup>
        </TooltipTrigger>
      </Tooltip>

      <span
        className="footnote-content hidden h-0 pt-1 xl:flex"
        ref={ref}
        style={{
          textShadow: highlight ? 'rgba(0,100,255, 0.8) 1px 0 8px' : undefined,
          transition: 'text-shadow 0.3s ease-out',
        }}
      >
        <sup className="footnote-index mt-0.5 text-xs">{index}</sup>
        &nbsp; <span className="text-sm">{content || children}</span>
      </span>
    </>
  );
};

export default Footnote;
