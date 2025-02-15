import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  breeds: string[];
  zipCodes: string[];
  ageMin: number;
  ageMax: number;
  size: number;
  from?: number;
  sortBy: string;
    sortOrder: string;
}

const initialState: SearchState = {
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 20,
    size: 0,
    sortBy: 'breed',
    sortOrder: 'asc',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<Partial<SearchState>>) => {
      return { ...state, ...action.payload };
    },
    resetSearchState: () => initialState,
  },
});

export const { setSearchState, resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
