import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { dogsApi } from './services/dogs';
import { locationsApi } from './services/locations';
import searchReducer from './slices/search';
import sessionReducer from './slices/session';

const store = configureStore({
  reducer: {
    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [dogsApi.reducerPath]: dogsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,

    // Slice reducers
    search: searchReducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware,
        dogsApi.middleware,
        locationsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;