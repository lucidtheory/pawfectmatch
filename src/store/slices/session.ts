import { createSlice } from '@reduxjs/toolkit';
import {
  getSessionLocalStorage,
  setSessionLocalStorage,
  clearSessionLocalStorage,
 } from 'utils/session';

export interface SessionState {
  sessionStartTime?: number;
}

const initialState: SessionState = {
  sessionStartTime: getSessionLocalStorage(),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionExpired: (state) => {
      state.sessionStartTime = undefined;
      clearSessionLocalStorage();
    },
    setSessionStartTime: (state) => {
      state.sessionStartTime = Date.now();
      setSessionLocalStorage(state.sessionStartTime);
    },
  },
});

export const { setSessionExpired, setSessionStartTime } = sessionSlice.actions;
export default sessionSlice.reducer;
