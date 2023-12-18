import { AxiosError, isAxiosError } from 'axios';

import { ErrorAPIResponse } from '@/lib/axios';

export function catchAxiosError(error: unknown): ErrorAPIResponse {
  const unexpectedError = 'Something went wrong, please try again later';

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorAPIResponse>;
    return {
      message: axiosError.response?.data.message ?? unexpectedError,
      errors: axiosError.response?.data.errors,
    };
  }

  return {
    message: unexpectedError,
  };
}
