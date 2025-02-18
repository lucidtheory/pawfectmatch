import { FC, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./SortSelector.styles";

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
    (e: SelectChangeEvent<string>) => {
      setValue(sortFieldName, e.target.value);
      setSelectedField(e.target.value);
    },
    [sortFieldName, setValue],
  );

  const handleChangeDirection = useCallback(
    (e: SelectChangeEvent<string>) => {
      setValue(sortOrderName, e.target.value);
      setSelectedDirection(e.target.value);
    },
    [sortOrderName, setValue],
  );

  return (
    <div style={styles.fieldContainer}>
      <FormControl sx={styles.input}>
        <InputLabel id="field">Sort by</InputLabel>
        <Select
          labelId="field"
          value={selectedField}
          onChange={handleChangeField}
          label="Sort by"
        >
          {fields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="sort-input">
        <InputLabel id="direction">Direction</InputLabel>
        <Select
          labelId="direction"
          value={selectedDirection}
          onChange={handleChangeDirection}
          label="Direction"
        >
          <MenuItem value="asc">ascending</MenuItem>
          <MenuItem value="desc">descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortSelector;
