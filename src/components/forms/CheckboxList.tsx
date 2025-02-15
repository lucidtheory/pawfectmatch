import { FC, useState } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <fieldset>
      <legend onClick={() => setIsExpanded(!isExpanded)}>
        {label} {isExpanded ? "-" : "+"}
      </legend>

      {isExpanded && (
        <div>
          {options.map((option) => (
            <div key={option.value}>
              <input
                type="checkbox"
                id={`${name}-${option.value}`}
                value={option.value}
                {...register(name, rules)}
              />
              <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
            </div>
          ))}
          {isSubmitted && <ErrorMessage errors={errors} name={name} />}
        </div>
      )}
    </fieldset>
  );
};

export default CheckboxList;
