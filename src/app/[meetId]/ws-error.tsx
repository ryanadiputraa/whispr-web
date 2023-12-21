'use client';

export function WsError({ message }: Readonly<{ message: string }>) {
  return (
    <div className="flex justify-center items-center flex-col gap-2 min-h-screen">
      <span className="text-3xl font-bold">Error...</span>
      <p className="text-lg">{message}</p>
    </div>
  );
}
