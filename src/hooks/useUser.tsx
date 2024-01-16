'use client';

import { useMainAction } from '@/context/actions/main';
import { useUserAction } from '@/context/actions/user';
import axios, { DataAPIResponse } from '@/lib/axios';
import { catchAxiosError } from '@/utils/error';
import { useRouter } from 'next/navigation';

import { useAuth } from './useAuth';

interface UserDataResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export function useUser() {
  const { jwtTokens } = useAuth();
  const { setUserData } = useUserAction();
  const { toggleToast } = useMainAction();
  const router = useRouter();

  const getUserData = async () => {
    try {
      const resp = await axios.get<DataAPIResponse<UserDataResponse>>('/api/users', {
        headers: {
          Authorization: `Bearer ${jwtTokens.access_token}`,
        },
      });
      const { id, email, first_name, last_name } = resp.data.data;
      setUserData({
        id,
        email,
        firstName: first_name,
        lastName: last_name,
      });
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ isOpen: true, type: 'ERROR', message: err.message });
      router.push('/auth/login');
    }
  };

  return { getUserData };
}
