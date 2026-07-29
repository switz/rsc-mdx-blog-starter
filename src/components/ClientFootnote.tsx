'use client';

import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const Footnote = ({ index, content, children }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  const onClick = () => {
    ref.current?.animate(
      [
        { textShadow: 'rgba(0,100,255,0.8) 1px 0 8px' },
        { textShadow: 'rgba(0,100,255,0) 1px 0 4px' },
      ],
      { duration: 2000, easing: 'ease-out' }
    );
  };

  return (
    <>
      <Tooltip placement="bottom">
        <TooltipContent className="max-w-[240px] xl:hidden">{content || children}</TooltipContent>
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

      <span className="footnote-content hidden h-0 pt-1 xl:flex" ref={ref}>
        <sup className="footnote-index mt-0.5 text-xs">{index}</sup>
        &nbsp; <span className="text-sm">{content || children}</span>
      </span>
    </>
  );
};

export default Footnote;
