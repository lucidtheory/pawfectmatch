import { FC, InputHTMLAttributes } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import TextField from "@mui/material/TextField";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  rules?: RegisterOptions;
}

const Input: FC<InputProps> = ({ name, label, type, rules, placeholder }) => {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  return (
    <div>
      <TextField
        label={label}
        type={type}
        fullWidth
        margin="normal"
        {...register(name, rules)}
        error={isSubmitted && !!errors?.[name]}
        helperText={placeholder}
      />
      {isSubmitted && <ErrorMessage errors={errors} name={name} />}
    </div>
  );
};

export default Input;
