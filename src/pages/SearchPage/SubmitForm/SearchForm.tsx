import { FC, useMemo } from "react";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hooks/store";
import { setSearchState } from "store/slices/search";
import MinMaxInput from "components/forms/MinMaxInput";
import SortSelector from "components/forms/SortSelector";
import Input from "components/forms/Input";
import CheckboxList from "components/forms/CheckboxList";
import { useGetBreedsQuery } from "store/services/dogs";
import Button from "@mui/material/Button";
import {
  ZIP_CODE_RULES,
  SORT_FIELDS,
  EMPTY_OPTIONS,
  transformFormToState,
  transformStateToForm,
  ISearchForm,
} from "./SearchForm.utils";
import styles from "./SearchForm.styles";

const SearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);
  const { data: breeds } = useGetBreedsQuery();
  const breedOptions = useMemo(
    () =>
      (breeds ?? EMPTY_OPTIONS)?.map((breed: string) => ({
        label: breed,
        value: breed,
      })),
    [breeds],
  );

  const initialValues = useMemo(() => transformStateToForm(searchState), []);

  const hookFormMethods = useForm<ISearchForm>({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<ISearchForm> = (data, e) => {
    e?.preventDefault();
    const stateData = transformFormToState(data);
    dispatch(setSearchState(stateData));
  };

  return (
    <FormProvider {...hookFormMethods}>
      <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
        <CheckboxList name="breeds" label="Breeds" options={breedOptions} />
        <Input
          name="zipCodes"
          label="Zip Codes"
          type="text"
          placeholder="ex: 12345, 24567"
          rules={ZIP_CODE_RULES}
        />
        <MinMaxInput name="age" label="Age" minValue={0} maxValue={50} />
        <Input
          name="size"
          label="Size"
          type="number"
          placeholder="ex: 10"
          min="0"
        />
        <SortSelector
          fields={SORT_FIELDS}
          defaultField="breed"
          sortOrderName="sortOrder"
          sortFieldName="sortBy"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={styles.submitButton}
        >
          Search
        </Button>
      </form>
    </FormProvider>
  );
};

export default SearchForm;
