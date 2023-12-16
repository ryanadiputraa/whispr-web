'use client';

import { getCookie } from 'cookies-next';

export interface JWTTokens {
  access_token: string;
}

export function useAuth(): JWTTokens | null {
  const reqCookies = getCookie('auth');
  if (!reqCookies) return null;

  const jwtTokens: JWTTokens = JSON.parse(reqCookies);
  return jwtTokens;
}
