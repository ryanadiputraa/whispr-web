import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

interface DataAPIResponse<T> {
  data: T;
}

type ErrorsResponse = {
  [key: string]: string;
};

interface ErrorAPIResponse {
  message: string;
  errors?: ErrorsResponse;
}

export type { DataAPIResponse, ErrorAPIResponse };
