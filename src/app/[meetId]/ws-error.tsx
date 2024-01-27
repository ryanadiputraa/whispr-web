'use client';

export function WsError({ message }: Readonly<{ message: string }>) {
  return (
    <div className="flex justify-center items-center flex-col gap-2 min-h-screen w-screen">
      <p className="text-lg">{message}</p>
    </div>
  );
}
