import Image from 'next/image';
import { CSSProperties, MouseEventHandler } from 'react';

interface Props {
  children?: React.ReactNode;
  style?: CSSProperties;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'DANGER';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  classNames?: string;
}

export function Button({
  children,
  style,
  type,
  variant = 'PRIMARY',
  onClick,
  disabled = false,
  isLoading = false,
  classNames,
}: Readonly<Props>) {
  const variatnStyle = {
    PRIMARY: 'bg-background-dark text-text-dark',
    SECONDARY: 'bg-background text-text border-2 border-background-dark',
    ACCENT: 'bg-accent dark:bg-accent-dark text-text dark:text-text-dark',
    DANGER: 'bg-red-400 text-text dark:text-text-dark',
  };

  return (
    <button
      style={style}
      type={type}
      className={`${variatnStyle[variant]} px-4 py-2 flex justify-center items-center rounded-3xl active:scale-95 active:brightness-95 ${classNames}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!isLoading ? (
        children
      ) : (
        <Image className="animate-spin" width={24} height={24} src={'/img/loader.png'} alt="loader" />
      )}
    </button>
  );
}
