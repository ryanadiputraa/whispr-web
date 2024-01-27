'use client';

import { useContext } from 'react';

import { AppContext } from '..';
import { Meet, User } from '../reducers/user';

export const useUserAction = () => {
  const { userDispatch } = useContext(AppContext);

  const setUserData = (data: User) => {
    userDispatch({ type: 'SET_USER_DATA', data });
  };
  const setUserMeets = (data: Meet[]) => {
    userDispatch({ type: 'SET_USER_MEET', data });
  };

  return { setUserData, setUserMeets };
};
