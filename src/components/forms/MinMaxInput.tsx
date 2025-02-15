import { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface MinMaxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  minValue?: number;
  maxValue?: number;
}

const MinMaxInput: FC<MinMaxInputProps> = ({
  name,
  label,
  minValue = 0,
  maxValue = Infinity,
  ...rest
}) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const minField = watch(`${name}.min`);
  const maxField = watch(`${name}.max`);

  return (
    <fieldset>
      <legend>{label}</legend>

      <div>
        <label htmlFor={`${name}-min`}>Min</label>
        <input
          id={`${name}-min`}
          type="number"
          {...register(`${name}.min`, {
            min: {
              value: minValue,
              message: `Value must be ${minValue} or higher`,
            },
            max: {
              value: maxValue,
              message: `Value must be ${maxValue} or lower`,
            },
            validate: (value) =>
              value && maxField && Number(value) > Number(maxField)
                ? "Min cannot be greater than Max"
                : true,
          })}
          {...rest}
        />
        {isSubmitted && <ErrorMessage errors={errors} name={`${name}.min`} />}
      </div>

      <div>
        <label htmlFor={`${name}-max`}>Max</label>
        <input
          id={`${name}-max`}
          type="number"
          {...register(`${name}.max`, {
            min: {
              value: minValue,
              message: `Value must be ${minValue} or higher`,
            },
            max: {
              value: maxValue,
              message: `Value must be ${maxValue} or lower`,
            },
            validate: (value) =>
              value && minField && Number(value) < Number(minField)
                ? "Max cannot be less than Min"
                : true,
          })}
          {...rest}
        />
        {isSubmitted && <ErrorMessage errors={errors} name={`${name}.max`} />}
      </div>
    </fieldset>
  );
};

export default MinMaxInput;
