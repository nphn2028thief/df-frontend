"use client";

import { InputHTMLAttributes, useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Eye, EyeOff } from "lucide-react";

interface IProps<T extends string>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: T;
  className?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
}

const Input = <T extends string>(props: IProps<T>) => {
  const {
    type = "text",
    label,
    htmlFor,
    placeholder,
    className,
    register,
    errors,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      <div className="flex items-center px-4 py-3 rounded-lg border-2 border-solid border-secondary-2">
        <input
          type={showPassword ? "text" : type}
          id={htmlFor}
          placeholder={placeholder}
          className="w-full bg-white dark:bg-gray-700"
          {...register}
          {...rest}
        />
        {type === "password" && (
          <span
            className="flex p-2 pl-3 -mr-2 -my-2 text-eye cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        name={htmlFor}
        render={({ message }) => (
          <p className="text-red-600 dark:text-red-500 text-sm">{message}</p>
        )}
      />
    </div>
  );
};

export default Input;
