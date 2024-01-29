'use client';

import { Dispatch, FormEvent, SetStateAction } from 'react';

import { Button } from '../components/button';
import { TextField } from '../components/input';

interface Props {
  isOpen: boolean;
  setMeetName: Dispatch<SetStateAction<string>>;
  onStart: (e: FormEvent<HTMLFormElement>) => void;
}

export function CreateMeetPrompt({ isOpen, setMeetName, onStart }: Readonly<Props>) {
  return (
    <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 h-screen w-screen overflow-hidden`}>
      <div className="grid place-items-center absolute h-screen w-screen bg-background-dark/90">
        <div className="bg-background p-4 px-6 sm:px-12 py-8 rounded-lg max-w-xl w-11/12 text-center">
          <form className="w-full flex flex-col items-center" onSubmit={onStart}>
            <span className="font-bold text-xl sm:text-3xl text-text">Create Silent Meet</span>
            <TextField
              classNames="w-full mt-8 text-text"
              type="text"
              required
              placeholder="Meet Name"
              onChange={(e) => setMeetName(e.target.value)}
            />
            <Button type="submit" classNames="mt-8 rounded-md px-8">
              Start
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
