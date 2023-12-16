'use client';

import { useContext } from 'react';

import { AppContext } from '..';
import { Toast } from '../reducers/main';

export const useMainAction = () => {
  const { main, mainDispatch } = useContext(AppContext);

  const toggleToast = (toast: Toast = { isOpen: false, type: main.toast.type, message: main.toast.message }) => {
    mainDispatch({ type: 'TOGGLE_TOAST', data: toast });
  };

  return { toggleToast };
};
