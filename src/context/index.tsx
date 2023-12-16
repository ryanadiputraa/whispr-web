import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

import { MainState, MainAction, mainReducer } from './reducers/main';

interface IInitialState {
  main: MainState;
}
const initialState: IInitialState = {
  main: {
    toast: {
      isOpen: false,
      type: 'INFO',
      message: '',
    },
  },
};

const AppContext = createContext<{
  main: MainState;
  mainDispatch: Dispatch<MainAction>;
}>({
  main: initialState.main,
  mainDispatch: () => null,
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: MainState, action: MainAction) => mainReducer(main, action),
    initialState.main
  );

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          main: mainState,
          mainDispatch: mainDispatch,
        }),
        [mainState, mainDispatch]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };