import { FC, useState } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Collapse,
} from "@mui/material";
import styles from "./CheckboxList.styles";

interface CheckboxListProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  rules?: RegisterOptions;
}

const CheckboxList: FC<CheckboxListProps> = ({
  name,
  label,
  options,
  rules,
}) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const selected = watch(name);

  return (
    <fieldset className="w-full" style={styles.fieldSet}>
      <FormLabel
        component="legend"
        onClick={() => setIsExpanded(!isExpanded)}
        sx={styles.formLabel}
      >
        {label} {isExpanded ? "-" : "+"}
      </FormLabel>
      {!!selected?.length && <p>{selected.join(", ")}</p>}
      <Collapse in={isExpanded}>
        <FormGroup sx={styles.formGroup}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  id={`${name}-${option.value}`}
                  value={option.value}
                  {...register(name, rules)}
                  color="primary"
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        {isSubmitted && <ErrorMessage errors={errors} name={name} />}
      </Collapse>
    </fieldset>
  );
};

export default CheckboxList;
