('');

import { useContext } from 'react';

import { AppContext } from '..';

export const useMainAction = () => {
  const { main, mainDispatch } = useContext(AppContext);

  return {};
};
