'use client';

import React from 'react';

const TAB_KEY_CODE = 9;

const handleKeyDown = (e) => {
  if (e.which === TAB_KEY_CODE) {
    reset();
    document.addEventListener('mousedown', handleMouseDown);
  }
};

const handleMouseDown = () => {
  reset();
  document.body.classList.add('focus-disabled');
  document.addEventListener('keydown', handleKeyDown);
};

const reset = () => {
  document.body.classList.remove('focus-disabled');
  document.removeEventListener('mousedown', handleMouseDown);
  document.removeEventListener('keydown', handleKeyDown);
};

export default function App({ children }) {
  React.useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => reset();
  }, []);

  return children;
}
