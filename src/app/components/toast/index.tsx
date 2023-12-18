'use client';

import { useContext, useLayoutEffect } from 'react';

import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';
import { Icon } from './icon';

const TOAST_TIMEOUT = 5000;

export function Toast() {
  const { main } = useContext(AppContext);
  const { toggleToast } = useMainAction();

  useLayoutEffect(() => {
    if (!main.toast.isOpen) return;
    const t = setTimeout(() => toggleToast(), TOAST_TIMEOUT);
    return () => clearTimeout(t);
  }, [main.toast.isOpen]);

  return (
    <div
      id="toast-success"
      className={`${
        main.toast.isOpen ? 'flex' : 'hidden'
      } absolute bottom-2 right-2 items-center gap-1 w-full max-w-xs p-4 mb-4 rounded-lg shadow text-text-dark bg-secondary-dark`}
      role="alert"
    >
      <Icon toast={main.toast} />
      <div className="ms-3 text-sm font-normal">{main.toast.message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 text-text-dark hover:text-white bg-secondary-dark hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={() => toggleToast()}
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
