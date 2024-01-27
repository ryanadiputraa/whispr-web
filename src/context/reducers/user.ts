export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        data: action.data,
      };

    case 'SET_USER_MEET':
      return {
        ...state,
        meets: action.data,
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
  meets: Meet[];
}

export interface Meet {
  id: string;
  name: string;
  created_at: string;
  ended_at: string;
}

export type UserAction = { type: 'SET_USER_DATA'; data: User } | { type: 'SET_USER_MEET'; data: Meet[] };
