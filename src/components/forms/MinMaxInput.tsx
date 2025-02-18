import { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextField, FormLabel } from "@mui/material";
import styles from "./MinMaxInput.styles";

interface MinMaxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  minValue?: number;
  maxValue?: number;
  type?: "number";
}

const MinMaxInput: FC<MinMaxInputProps> = ({
  name,
  label,
  minValue = 0,
  maxValue = Infinity,
}) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const minField = watch(`${name}.min`);
  const maxField = watch(`${name}.max`);

  return (
    <fieldset style={styles.fieldSet}>
      <FormLabel component="legend" sx={styles.formLabel}>
        {label}
      </FormLabel>
      <div style={styles.fieldContainer}>
        <div style={styles.input}>
          <TextField
            id={`${name}-min`}
            label="Min"
            type="number"
            helperText="ex: 0"
            min={minValue}
            max={maxValue}
            {...register(`${name}.min`, {
              validate: (value) =>
                value && maxField && Number(value) > Number(maxField)
                  ? "Min cannot be greater than Max"
                  : true,
            })}
            fullWidth
            error={!!errors[name]}
          />
          {isSubmitted && <ErrorMessage errors={errors} name={`${name}.min`} />}
        </div>
        <div style={styles.input}>
          <TextField
            id={`${name}-max`}
            label="Max"
            type="number"
            helperText="ex: 100"
            min={minValue}
            max={maxValue}
            {...register(`${name}.max`, {
              validate: (value) =>
                value && minField && Number(value) < Number(minField)
                  ? "Max cannot be less than Min"
                  : true,
            })}
            fullWidth
            error={!!errors[name]}
          />
          {isSubmitted && <ErrorMessage errors={errors} name={`${name}.max`} />}
        </div>
      </div>
    </fieldset>
  );
};

export default MinMaxInput;
