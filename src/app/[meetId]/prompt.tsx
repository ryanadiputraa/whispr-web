'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '../components/button';
import { TextField } from '../components/input';

interface Props {
  isOpen: boolean;
  setIsPromptOpen: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

export function Prompt({ isOpen, setIsPromptOpen, setUsername }: Readonly<Props>) {
  const [value, setValue] = useState<string>();

  const onJoin = () => {
    if (!value) return;
    setIsPromptOpen(false);
    setUsername(value);
  };

  return (
    <div
      className={`${isOpen ? 'grid' : 'hidden'}  place-items-center absolute h-screen w-screen bg-background-dark/90`}
    >
      <div className="bg-background p-4 px-6 sm:px-12 py-8 rounded-lg max-w-xl w-11/12 text-center">
        <form className="w-full flex flex-col items-center" onSubmit={onJoin}>
          <span className="font-bold text-xl sm:text-3xl text-text">Join Silent Meet</span>
          <TextField
            classNames="w-full mt-8 text-text"
            type="text"
            required
            placeholder="username"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" classNames="mt-8 rounded-md px-8">
            Join
          </Button>
        </form>
      </div>
    </div>
  );
}
