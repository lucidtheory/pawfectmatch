import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { dogsApi } from './services/dogs';
import { locationsApi } from './services/locations';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dogsApi.reducerPath]: dogsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware,
        dogsApi.middleware,
        locationsApi.middleware
    ),
});

export default store;