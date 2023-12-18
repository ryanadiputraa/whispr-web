import { ChangeEventHandler } from 'react';

interface Props {
  placeholder: string;
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  classNames?: string;
}

export function TextField({ placeholder, value, onChange, required = false, classNames }: Readonly<Props>) {
  return (
    <input
      required={required}
      className={`p-2 bg-transparent border-b-2 border-background-dark focus:outline-none ${classNames}`}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
