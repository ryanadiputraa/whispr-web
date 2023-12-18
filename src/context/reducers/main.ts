export const mainReducer = (state: MainState, action: MainAction) => {
  switch (action.type) {
    case 'TOGGLE_TOAST':
      return {
        ...state,
        toast: action.data,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };

    default:
      return { ...state };
  }
};

export interface Toast {
  isOpen: boolean;
  type: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
}

export interface MainState {
  toast: Toast;
  theme: string;
}

export type MainAction = { type: 'TOGGLE_THEME' } | { type: 'TOGGLE_TOAST'; data: Toast };
