import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface Props {
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  classNames?: string;
}

export function TextField({ type, placeholder, value, onChange, required = false, classNames }: Readonly<Props>) {
  return (
    <input
      type={type}
      required={required}
      className={`p-2 bg-transparent border-b-2 border-background-dark focus:outline-none ${classNames}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
