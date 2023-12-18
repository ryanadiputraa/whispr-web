'use client';

import { useContext, useEffect } from 'react';

import { AppContext } from '..';
import { Toast } from '../reducers/main';

export const useMainAction = () => {
  const { main, mainDispatch } = useContext(AppContext);

  const toggleTheme = () => {
    const replace = main.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') window.localStorage.setItem('theme', replace);
    mainDispatch({ type: 'TOGGLE_THEME' });
  };

  const toggleToast = (toast: Toast = { isOpen: false, type: main.toast.type, message: main.toast.message }) => {
    mainDispatch({ type: 'TOGGLE_TOAST', data: toast });
  };

  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.replace(main.theme === 'dark' ? 'light' : 'dark', main.theme);
  }, [main.theme]);

  return { toggleTheme, toggleToast };
};
