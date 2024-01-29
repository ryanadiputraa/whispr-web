'use client';

import { format } from 'date-fns';
import { useContext } from 'react';

import { AppContext } from '@/context';
import { Meet } from '@/context/reducers/user';

function Dashboard(): React.ReactNode {
  const { user } = useContext(AppContext);

  return (
    <div className="overflow-y-auto p-4">
      <h4 className="font-bold text-2xl">My Summary</h4>
      <div className="flex gap-4 justify-between flex-wrap mt-4">
        {user.meets.map((meet) => (
          <MeetCard key={meet.id} meet={meet} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

function MeetCard({ meet }: { meet: Meet }): React.ReactNode {
  return (
    <div className="bg-accent p-4 rounded-md flex flex-col md:w-64 w-full text-text-dark hover:scale-105 transition-all">
      <span className="font-bold">{meet.name}</span>
      <p>AI Sentiment placeholder</p>
      <span className="self-end text-sm mt-4 italic">{format(meet.created_at, 'MMM do, yyyy - H:mm')}</span>
    </div>
  );
}
