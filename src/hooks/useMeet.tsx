'use client';

import { useEffect } from 'react';

import { useMainAction } from '@/context/actions/main';
import axios, { DataAPIResponse } from '@/lib/axios';
import { socket } from '@/lib/socket';
import { catchAxiosError } from '@/utils/error';
import { useAuth } from './useAuth';

export function useMeet() {
  const { jwtTokens } = useAuth();
  const { toggleToast } = useMainAction();

  const createMeetingSession = async (): Promise<string | undefined> => {
    try {
      const resp = await axios.post<DataAPIResponse<string>>('/api/meets', null, {
        headers: {
          Authorization: `Bearer ${jwtTokens.access_token}`,
        },
      });
      return resp.data.data;
    } catch (error) {
      const err = catchAxiosError(error);
      toggleToast({ type: 'ERROR', isOpen: true, message: err.message });
    }
  };

  return { createMeetingSession };
}

export function useConnection() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
}
