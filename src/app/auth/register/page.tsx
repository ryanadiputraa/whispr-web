'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button } from '@/app/components/button';
import { RegisterPayload, useAuth } from '@/hooks/useAuth';
import { TextField } from '../../components/input';

export default function Register(): React.ReactNode {
  const router = useRouter();
  const { register, login } = useAuth();
  const [payload, setPayload] = useState<RegisterPayload>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    confirm_password?: string;
  } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({ confirm_password: payload.password !== confirmPassword ? "password didn't match" : '' });
    if (payload.password !== confirmPassword) return;

    setIsLoading(true);
    const resp = await register(payload);

    if (resp.message) {
      setErrors(resp.errors ?? errors);
      setIsLoading(false);
      return;
    }

    await login({ email: payload.email, password: payload.password });
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="w-full min-h-screen grid place-items-center bg-background-dark">
      <div className="flex flex-col items-center bg-background text-text px-6 sm:px-12 py-8 rounded-lg max-w-xl w-11/12 text-center">
        <span className="font-bold text-xl sm:text-3xl">Register</span>
        <p className="text-xs sm:text-base">Create your Whispr account</p>
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
            type="text"
            classNames={`w-full mt-4 ${!errors?.first_name ? 'mb-5' : ''}`}
            placeholder="First Name"
            required
            value={payload.first_name}
            onChange={(e) =>
              setPayload((current) => ({
                ...current,
                first_name: e.target.value,
              }))
            }
          />
          {errors?.first_name && <span className="text-sm text-red-600 self-start">{errors.first_name}</span>}
          <TextField
            type="text"
            classNames={`w-full mt-4 ${!errors?.last_name ? 'mb-5' : ''}`}
            placeholder="Last Name"
            required
            value={payload.last_name}
            onChange={(e) =>
              setPayload((current) => ({
                ...current,
                last_name: e.target.value,
              }))
            }
          />
          {errors?.last_name && <span className="text-sm text-red-600 self-start">{errors.last_name}</span>}
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
          <TextField
            type="password"
            classNames={`w-full mt-4 ${!errors?.confirm_password ? 'mb-5' : ''}`}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors?.confirm_password && (
            <span className="text-sm text-red-600 self-start">{errors.confirm_password}</span>
          )}
          <Button
            type="submit"
            classNames="mt-8"
            disabled={isLoading}
            isLoading={isLoading}
            style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
          >
            Register
          </Button>
        </form>
        <span className="self-end mt-12">
          Already have an account?{' '}
          <Link className="text-blue-700 font-bold" href={'/auth/login'}>
            Sign In
          </Link>{' '}
          here
        </span>
      </div>
    </div>
  );
}
