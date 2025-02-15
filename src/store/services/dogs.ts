import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./apiBase";
import {
  GetDogBreedsResponse,
  MatchDogsParams,
  MatchDogsResonse,
  PostGetDogsParams,
  PostGetDogsResponse,
  SearchDogBreedsParams,
  SearchDogBreedsResponse,
} from "./types/dogs";

export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery,
  endpoints: (builder) => ({
    getBreeds: builder.query<GetDogBreedsResponse, void>({
      query: () => ({
        url: "/dogs/breeds",
        method: "GET",
      }),
    }),
    searchDogs: builder.query<SearchDogBreedsResponse, SearchDogBreedsParams>({
      query: (body) => ({
        url: "/dogs/search",
        method: "GET",
        body,
      }),
    }),
    getDogs: builder.mutation<PostGetDogsResponse, PostGetDogsParams>({
      query: (body) => ({
        url: "/dogs",
        method: "POST",
        body,
      }),
    }),
    matchDogs: builder.mutation<MatchDogsResonse, MatchDogsParams>({
      query: (body) => ({
        url: "/dogs/match",
        method: "POST",
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
