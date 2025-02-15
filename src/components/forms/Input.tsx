import { FC, InputHTMLAttributes } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  rules?: RegisterOptions;
}

const Input: FC<InputProps> = ({ name, label, type, rules, ...rest }) => {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register(name, rules)} {...rest} />
      {isSubmitted && <ErrorMessage errors={errors} name={name} />}
    </div>
  );
};

export default Input;
