'use client';

import { useContext } from 'react';

import { AppContext } from '@/context';

function Dashboard(): React.ReactNode {
  const { user } = useContext(AppContext);

  return <div>Dashboard</div>;
}

export default Dashboard;
