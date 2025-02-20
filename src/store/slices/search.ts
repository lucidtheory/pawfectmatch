import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  breeds: string[];
  zipCodes: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  sortBy: string;
  sortOrder: string;
  query: string;
}

const initialState: SearchState = {
  breeds: [],
  zipCodes: [],
  ageMin: undefined,
  ageMax: undefined,
  size: undefined,
  sortBy: "breed",
  sortOrder: "asc",
  query: "sort=breed%3Aasc",
};

export const generateQuery = (state: SearchState): string => {
  const params = new URLSearchParams();
  if (state.breeds.length) {
    state.breeds.forEach((breed) => {
      params.append("breeds", breed);
    });
  }
  if (state.zipCodes.length) {
    state.zipCodes.forEach((zipCode) => {
      params.append("zipCodes", zipCode);
    });
  }
  if (state.ageMin) params.append("ageMin", String(state.ageMin));
  if (state.ageMax) params.append("ageMax", String(state.ageMax));
  if (state.size) params.append("size", String(state.size));
  if (state.sortBy && state.sortOrder) {
    params.append("sort", `${state.sortBy}:${state.sortOrder}`);
  }

  return params.toString();
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<Partial<SearchState>>) => {
      const updatedState = { ...state, ...action.payload };
      const query = generateQuery(updatedState);
      return { ...updatedState, query };
    },
    resetSearchState: () => initialState,
  },
});

export const { setSearchState, resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
