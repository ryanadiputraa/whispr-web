'use client';

import { useContext } from 'react';

import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';

export default function Settings() {
  const { main } = useContext(AppContext);
  const { toggleTheme } = useMainAction();

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center py-3 w-4/5 border-b-[0.05rem] border-secondary-dark dark:border-secondary">
        <label>Use dark theme</label>
        <input className="w-4 h-4" type="checkbox" checked={main.theme === 'dark'} onChange={() => toggleTheme()} />
      </div>
    </div>
  );
}
