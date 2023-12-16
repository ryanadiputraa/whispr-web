export const mainReducer = (state: MainState, action: MainAction) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export interface MainState {}

export type MainAction = { type: '' };
