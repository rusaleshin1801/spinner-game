import React from "react";
import "./style.css";

interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  required?: boolean;
  startIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  style,
  placeholder,
  type = "text",
  readOnly = false,
  required = false,
  startIcon,
  ...props
}) => {
  return (
    <div className="input-container">
      {startIcon && <div className="input-icon">{startIcon}</div>}
      <input
        value={value}
        onChange={onChange}
        style={style}
        placeholder={placeholder}
        className="input"
        type={type}
        readOnly={readOnly}
        required={required}
        {...props}
      />
    </div>
  );
};
