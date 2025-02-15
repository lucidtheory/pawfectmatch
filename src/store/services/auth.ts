import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./apiBase";
import { LoginParams } from "./types/auth";
import { setSessionStartTime } from "../slices/session";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginParams>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // Set session start on successful login
          dispatch(setSessionStartTime());
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
