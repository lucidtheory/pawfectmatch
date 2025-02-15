import { FC, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface SortSelectorProps {
  fields: string[];
  defaultField: string;
  name: string;
}

const SortSelector: FC<SortSelectorProps> = ({
  fields,
  defaultField,
  name,
}) => {
  const [selectedField, setSelectedField] = useState<string>(defaultField);
  const [selectedDirection, setSelectedDirection] = useState<string>("asc");

  const { setValue } = useFormContext();

  useEffect(() => {
    const sortValue = `sort=${selectedField}:${selectedDirection}`;
    setValue(name, sortValue);
  }, [selectedField, selectedDirection, name, setValue]);

  const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(e.target.value);
  };

  const handleChangeDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDirection(e.target.value);
  };

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
