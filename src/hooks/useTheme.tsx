'use client';

import { useState } from 'react';

type State = 'dark' | 'light';

interface Theme {
  state: State;
  toggleTheme: () => void;
}

export function useTheme(): Theme {
  const [state, setState] = useState<State>('dark');

  const toggleTheme = () => {
    const html = document.querySelector('html');
    const replace = state === 'dark' ? 'light' : 'dark';
    html?.classList.replace(state, replace);
    setState(replace);
  };

  return { state, toggleTheme };
}
