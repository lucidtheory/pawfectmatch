import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  breeds: string[];
  zipCodes: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
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
    from: undefined,
    sortBy: 'breed',
    sortOrder: 'asc',
    query: "",
};

const generateQuery = (state: SearchState): string => {
  const params = new URLSearchParams();

  if (state.breeds.length) params.append("breeds", state.breeds.join(","));
  if (state.zipCodes.length) params.append("zipCodes", state.zipCodes.join(","));
  if (state.ageMin !== undefined) params.append("ageMin", String(state.ageMin));
  if (state.ageMax !== undefined) params.append("ageMax", String(state.ageMax));
  if (state.size) params.append("size", String(state.size));
  if (state.from) params.append("from", String(state.from));
  if (state.sortBy && state.sortOrder) {
    params.append("sort", `${state.sortBy}:${state.sortOrder}`);
  }

  return params.toString();
};


const searchSlice = createSlice({
  name: 'search',
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
