'use client';

import { getCookie, setCookie, deleteCookie } from 'cookies-next';

import { useMainAction } from '@/context/actions/main';
import axios, { DataAPIResponse, ErrorAPIResponse } from '@/lib/axios';
import { catchAxiosError } from '@/utils/error';

export interface JWTTokens {
  access_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
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
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const expiresTime = new Date(now.getTime() + oneDay);
    setCookie('auth', tokens, { expires: expiresTime });
  };

  const clearJWTTokens = () => deleteCookie('auth');

  const login = async (payload: LoginPayload): Promise<ErrorAPIResponse> => {
    try {
      const resp = await axios.post<DataAPIResponse<JWTTokens>>('/auth/login', payload);
      setJWTTokens(resp.data.data);
      return { message: '', errors: {} };
    } catch (error) {
      const err = catchAxiosError(error);
      if (!err.errors) toggleToast({ isOpen: true, type: 'ERROR', message: err.message });
      return err;
    }
  };

  const register = async (payload: RegisterPayload): Promise<ErrorAPIResponse> => {
    try {
      await axios.post('/auth/register', payload);
      return { message: '', errors: {} };
    } catch (error) {
      const err = catchAxiosError(error);
      if (!err.errors) toggleToast({ isOpen: true, type: 'ERROR', message: err.message });
      return err;
    }
  };

  return { jwtTokens, login, register, clearJWTTokens };
}
