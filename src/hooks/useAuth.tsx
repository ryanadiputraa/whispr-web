'use client';

import { getCookie } from 'cookies-next';

export interface JWTTokens {
  access_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function useAuth() {
  let jwtTokens: JWTTokens = {
    access_token: '',
  };
  const reqCookies = getCookie('auth');
  if (reqCookies) {
    jwtTokens = JSON.parse(reqCookies);
  }

  return { jwtTokens };
}
