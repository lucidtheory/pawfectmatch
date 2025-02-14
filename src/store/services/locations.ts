import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiBase';
import {
    PostLocationsParams,
    PostLocationsResponse,
    PostLocationSearchParams,
    PostLocationsSearchResponse,
} from './types/locations';

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery,
  endpoints: (builder) => ({
    getLocations: builder.mutation<
        PostLocationsResponse,
        PostLocationsParams
    >({
      query: (body) => ({
        url: '/locations',
        method: 'POST',
        body,
      }),
    }),
    searchLocations: builder.mutation<
      PostLocationsSearchResponse,
      PostLocationSearchParams
    >({
      query: (body) => ({
        url: '/locations/search',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetLocationsMutation,
  useSearchLocationsMutation,
} = locationsApi;
