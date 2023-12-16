'use client';

import { useState } from 'react';

interface Theme {
  state: string;
  toggleTheme: () => void;
}

export function useTheme(): Theme {
  const [state, setState] = useState<string>('dark');

  const toggleTheme = () => {
    console.log('hit');

    const html = document.querySelector('html');
    const replace = state === 'dark' ? 'light' : 'dark';
    html?.classList.replace(state, replace);
    setState(replace);
  };

  return { state, toggleTheme };
}
