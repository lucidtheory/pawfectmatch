import { FC, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";

interface SortSelectorProps {
  fields: string[];
  defaultField: string;
  sortOrderName: string;
  sortFieldName: string;
}

const SortSelector: FC<SortSelectorProps> = ({
  fields,
  defaultField,
  sortOrderName,
  sortFieldName,
}) => {
  const [selectedField, setSelectedField] = useState<string>(defaultField);
  const [selectedDirection, setSelectedDirection] = useState<string>("asc");

  const { setValue } = useFormContext();

  const handleChangeField = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(sortFieldName, e.target.value);
      setSelectedField(e.target.value);
    },
    [sortFieldName, setValue],
  );

  const handleChangeDirection = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(sortOrderName, e.target.value);
      setSelectedDirection(e.target.value);
    },
    [sortOrderName, setValue],
  );

  return (
    <div>
      <label htmlFor="field">Sort by</label>
      <select id="field" value={selectedField} onChange={handleChangeField}>
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      <label htmlFor="direction">Direction</label>
      <select
        id="direction"
        value={selectedDirection}
        onChange={handleChangeDirection}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortSelector;
