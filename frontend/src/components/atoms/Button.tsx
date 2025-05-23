import React from "react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const ButtonStyles = {
  primary:
    "cursor-pointer rounded-lg bg-blue-400 text-sm text-white font-medium p-2 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all",
  secondary:
    "flex items-center justify-center cursor-pointer rounded-lg bg-gray-500 text-sm text-white font-medium p-2 h-fit hover:border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all",
};

const Button: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
  const buttonStyle = ButtonStyles[variant];
  return (
    <button className={`${buttonStyle} `} {...props}>
      {children}
    </button>
  );
};

export default Button;
