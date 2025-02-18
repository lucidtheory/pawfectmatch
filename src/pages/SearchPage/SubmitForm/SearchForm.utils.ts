import { ZIP_CODE_REGEX } from "utils/regex";
import { SearchState } from "store/slices/search";

export const ZIP_CODE_RULES = {
  pattern: {
    value: ZIP_CODE_REGEX,
    message:
      "Enter valid 5-digit zip codes, separated by commas (e.g., 12345, 67890)",
  },
};

export const SORT_FIELDS = ["breed", "name", "age"];
export const EMPTY_OPTIONS: string[] = [];

export interface ISearchForm {
  age: { min?: number; max?: number };
  breeds?: string[];
  zipCodes?: string;
  size?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const transformStateToForm = (state: SearchState): ISearchForm => ({
  age: { min: state.ageMin, max: state.ageMax },
  breeds: state.breeds,
  zipCodes: state.zipCodes.join(", ").replace(/\s+/g, ""),
  size: state.size ? String(state.size) : undefined,
  sortBy: state.sortBy,
  sortOrder: state.sortOrder,
});

export const transformFormToState = (
  data: ISearchForm,
): Partial<SearchState> => ({
  ageMin: data.age.min,
  ageMax: data.age.max,
  breeds: data.breeds ?? [],
  zipCodes: data.zipCodes?.replace(/\s+/g, "").split(",").filter(Boolean) ?? [],
  size: Number(data.size),
  sortBy: data.sortBy,
  sortOrder: data.sortOrder,
});
