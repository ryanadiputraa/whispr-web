'use client';

import Image from 'next/image';

export function Loader() {
  return (
    <div className="flex justify-center items-center flex-col gap-2 min-h-screen">
      <Image priority className="animate-spin" width={40} height={40} src={'/img/loader.png'} alt="loading..." />
    </div>
  );
}
