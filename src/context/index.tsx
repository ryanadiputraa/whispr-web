import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

import { MainState, MainAction, mainReducer } from './reducers/main';
import { UserAction, userReducer, UserState } from './reducers/user';

interface IInitialState {
  main: MainState;
  user: UserState;
}
const initialState: IInitialState = {
  main: {
    toast: {
      isOpen: false,
      type: 'INFO',
      message: '',
    },
  },
  user: {
    data: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  },
};

const AppContext = createContext<{
  main: MainState;
  mainDispatch: Dispatch<MainAction>;
  user: UserState;
  userDispatch: Dispatch<UserAction>;
}>({
  main: initialState.main,
  mainDispatch: () => null,
  user: initialState.user,
  userDispatch: () => null,
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: MainState, action: MainAction) => mainReducer(main, action),
    initialState.main
  );
  const [userState, userDispatch] = useReducer(
    (user: UserState, action: UserAction) => userReducer(user, action),
    initialState.user
  );

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          main: mainState,
          mainDispatch: mainDispatch,
          user: userState,
          userDispatch: userDispatch,
        }),
        [mainState, mainDispatch, userState, userDispatch]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
