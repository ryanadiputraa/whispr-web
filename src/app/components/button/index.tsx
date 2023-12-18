import Image from 'next/image';
import { CSSProperties, MouseEventHandler } from 'react';

interface Props {
  style?: CSSProperties;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'PRIMARY' | 'SECONDARY';
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  classNames?: string;
}

export function Button({
  style,
  type,
  variant = 'PRIMARY',
  text,
  onClick,
  disabled = false,
  isLoading = false,
  classNames,
}: Readonly<Props>) {
  const variatnStyle = {
    PRIMARY: 'bg-background-dark text-text-dark',
    SECONDARY: 'bg-background text-text border-2 border-background-dark',
  };

  return (
    <button
      style={style}
      type={type}
      className={`${variatnStyle[variant]} px-4 py-2 grid place-items-center rounded-3xl ${classNames}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!isLoading ? (
        text
      ) : (
        <Image className="animate-spin" width={24} height={24} src={'/img/loader.png'} alt="loader" />
      )}
    </button>
  );
}
