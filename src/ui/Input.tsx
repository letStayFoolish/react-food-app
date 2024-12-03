import React, { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ id, label, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input name={id} id={id} required {...props} />
    </p>
  );
};

export default Input;
