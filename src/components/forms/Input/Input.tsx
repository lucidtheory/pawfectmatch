import { FC, InputHTMLAttributes } from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  rules?: RegisterOptions;
}

const Input: FC<InputProps> = ({
    name,
    label,
    type,
    rules,
    ...rest
}) => {
  const { register, formState: { errors, isSubmitted } } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        {...rest}
      />
      {isSubmitted && errors[name] && <p>{errors[name]?.message}</p>}
    </div>
  );
};

export default Input;
