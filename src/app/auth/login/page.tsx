'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button } from '@/app/components/button';
import { LoginPayload, useAuth } from '@/hooks/useAuth';
import { TextField } from '../../components/input';

export default function Login(): React.ReactNode {
  const router = useRouter();
  const { login } = useAuth();
  const [payload, setPayload] = useState<LoginPayload>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await login(payload);
    setIsLoading(false);

    if (resp.message) {
      setErrors(resp.errors ?? errors);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="w-full min-h-screen grid place-items-center bg-background-dark">
      <div className="flex flex-col items-center bg-background text-text px-6 sm:px-12 py-8 rounded-lg max-w-xl w-11/12 text-center">
        <span className="font-bold text-xl sm:text-3xl">Sign In</span>
        <p className="text-xs sm:text-base">Start your silent meeting session</p>
        <form className="relative mt-8 flex flex-col w-full" onSubmit={onSubmit}>
          <TextField
            type="email"
            classNames={`w-full ${!errors?.email ? 'mb-5' : ''}`}
            placeholder="Email"
            required
            value={payload.email}
            onChange={(e) =>
              setPayload((current) => ({
                ...current,
                email: e.target.value,
              }))
            }
          />
          {errors?.email && <span className="text-sm text-red-600 self-start">{errors.email}</span>}
          <TextField
            type="password"
            classNames={`w-full mt-4 ${!errors?.password ? 'mb-5' : ''}`}
            placeholder="Password"
            required
            value={payload.password}
            onChange={(e) =>
              setPayload((current) => ({
                ...current,
                password: e.target.value,
              }))
            }
          />
          {errors?.password && <span className="text-sm text-red-600 self-start">{errors.password}</span>}
          <Button
            type="submit"
            text="Login"
            classNames="mt-8"
            disabled={isLoading}
            isLoading={isLoading}
            style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
          />
        </form>
        <span className="self-end mt-12">
          Don&apos;t have account?{' '}
          <Link className="text-blue-700 font-bold" href={'/dashboard/register'}>
            Register
          </Link>{' '}
          now
        </span>
      </div>
    </div>
  );
}
