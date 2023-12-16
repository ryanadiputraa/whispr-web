export const mainReducer = (state: MainState, action: MainAction) => {
  switch (action.type) {
    case 'TOGGLE_TOAST':
      return {
        ...state,
        toast: action.data,
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
}

export type MainAction = { type: 'TOGGLE_TOAST'; data: Toast };
