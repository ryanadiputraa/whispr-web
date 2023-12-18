'use client';

import { getCookie, setCookie } from 'cookies-next';

import { useMainAction } from '@/context/actions/main';
import axios, { DataAPIResponse } from '@/lib/axios';
import { catchAxiosError } from '@/utils/error';

export interface JWTTokens {
  access_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  errors?: {
    message?: string;
    email?: string;
    password?: string;
  };
}

export function useAuth() {
  const { toggleToast } = useMainAction();

  let jwtTokens: JWTTokens = {
    access_token: '',
  };
  const reqCookies = getCookie('auth');
  if (reqCookies) {
    jwtTokens = JSON.parse(reqCookies);
  }

  const setJWTTokens = (tokens: JWTTokens) => {
    setCookie('auth', tokens);
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const resp = await axios.post<DataAPIResponse<JWTTokens>>('/auth/login', payload);
      setJWTTokens(resp.data.data);
      return { errors: undefined };
    } catch (error) {
      const err = catchAxiosError(error);
      if (!err.errors) toggleToast({ isOpen: true, type: 'ERROR', message: err.message });
      return {
        errors: {
          message: err.message,
          ...err.errors,
        },
      };
    }
  };

  return { jwtTokens, login };
}
