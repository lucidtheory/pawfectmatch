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
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const selected = watch(name);

  return (
    <fieldset className="w-full">
      <legend
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer"
      >
        {label} {isExpanded ? "-" : "+"}
      </legend>
      {!!selected.length && <p>{selected.join(", ")}</p>}
      {isExpanded && (
        <div className="max-h-60 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${name}-${option.value}`}
                  value={option.value}
                  {...register(name, rules)}
                  className="mr-2"
                />
                <label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {isSubmitted && <ErrorMessage errors={errors} name={name} />}
        </div>
      )}
    </fieldset>
  );
};

export default CheckboxList;
