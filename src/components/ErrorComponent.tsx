import React from "react";

type Props = {
  title: string;
  message: string;
};

const ErrorComponent: React.FC<Props> = ({ title, message }) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
