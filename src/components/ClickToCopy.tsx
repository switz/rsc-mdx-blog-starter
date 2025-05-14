'use client';

import { Check, Copy } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface ClickToCopyProps {
  text: string;
  children?: ReactNode;
  className?: string;
  successDuration?: number;
}

const ClickToCopy = ({
  text,
  children,
  className = '',
  successDuration = 2000,
}: ClickToCopyProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, successDuration);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <div
      className={`relative inline-flex items-center group ${className}`}
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Copy ${text} to clipboard`}
    >
      {children}
      <Tooltip open={!!copied}>
        <TooltipContent>Copied!</TooltipContent>
        <TooltipTrigger>
          <button
            className="p-1 cursor-pointer rounded-md text-gray-200 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
};

export default ClickToCopy;
