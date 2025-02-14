import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiBase';
import {
    GetDogBreedsResponse,
    MatchDogsParams,
    PostGetDogsParams,
    PostGetDogsResponse,
    SearchDogBreedsParams,
    SearchDogBreedsResponse,
} from './types/dogs';

export const dogsApi = createApi({
  reducerPath: 'dogsApi',
  baseQuery,
  endpoints: (builder) => ({
    getBreeds: builder.query<GetDogBreedsResponse, void>({
      query: () => '/dogs/breeds',
    }),
    searchDogs: builder.query<
        SearchDogBreedsResponse,
        SearchDogBreedsParams
    >({
      query: (body) => ({
        url: '/dogs/search',
        method: 'POST',
        body,
      }),
    }),
    getDogs: builder.mutation<
        PostGetDogsParams,
        PostGetDogsResponse
    >({
        query: (body) => ({
            url: '/dogs',
            method: 'POST',
            body,
        }),
    }),
    matchDogs: builder.mutation<
        MatchDogsParams,
        MatchDogsParams
    >({
      query: (body) => ({
        url: '/dogs/match',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
    useGetBreedsQuery,
    useSearchDogsQuery,
    useGetDogsMutation,
    useMatchDogsMutation,
} = dogsApi;
