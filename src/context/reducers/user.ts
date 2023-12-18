export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        data: action.data,
      };

    default:
      return { ...state };
  }
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserState {
  data: User;
}

export type UserAction = { type: 'SET_USER_DATA'; data: User };
