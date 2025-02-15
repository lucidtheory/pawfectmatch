import { FC } from 'react';
import { SubmitHandler, FormProvider, useForm  } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hooks/store';
import { setSearchState } from 'store/slices/search';
import MinMaxInput from 'components/forms/MinMaxInput';
import SortSelector from 'components/forms/SortSelector';
import Input from 'components/forms/Input';
import CheckboxList from 'components/forms/CheckboxList';
import { ZIP_CODE_REGEX } from 'utils/regex';

const ZIP_CODE_RULES = {
  pattern: {
    value: ZIP_CODE_REGEX,
    message: "Enter valid 5-digit zip codes, separated by commas (e.g., 12345, 67890)",
  },
};

const SORT_FIELDS = ['breed', 'name', 'age'];


const SearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  const hookFormMethods = useForm({
    defaultValues: searchState,
  });

  const onSubmit = (data: any) => {
    dispatch(setSearchState(data));
  };

  return (
    <FormProvider {...hookFormMethods}>
        <form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
            <CheckboxList
                name="breeds"
                label="Breeds"
                options={[]}
            />
            <Input
                name="zipCodes"
                label="Zip Codes"
                type="text"
                placeholder='ex: 12345, 24567'
                rules={ZIP_CODE_RULES}
            />
            <MinMaxInput
                name="age"
                label="Age"
                minValue={0}
                maxValue={50}
            />
            <Input
                name="size"
                label="Size"
                type="number"
                placeholder='ex: 10'
                min="0"
            />
            <SortSelector
                fields={SORT_FIELDS}
                defaultField='breed'
                name="sort"
            />
            <button type="submit">
                Search
            </button>
        </form>
    </FormProvider>
  );
};

export default SearchForm;
