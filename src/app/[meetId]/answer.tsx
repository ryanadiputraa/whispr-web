import { format } from 'date-fns';

import { Avatar } from '../components/avatar';

interface Props {
  username: string;
  answer: string;
  timestamp: string;
}

export function Answer({ username, answer, timestamp }: Props) {
  const [firstName, lastName] = username.split(' ');

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-1">
        <Avatar firstName={firstName} lastName={lastName ?? ' '} />
        <span className="text-xs text-center">{username}</span>
      </div>
      <div className="flex flex-col bg-accent-transparent dark:bg-accent-dark-transparent py-2 px-4 text-justify rounded-md">
        <p>{answer}</p>
        <span className="self-end">{format(timestamp, 'HH:mm')}</span>
      </div>
    </div>
  );
}
