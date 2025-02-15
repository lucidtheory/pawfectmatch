import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./apiBase";
import { LoginParams } from "./types/auth";
import { setSessionStartTime } from "utils/auth";

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
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;

          // Store session start time to calculate session duration
          setSessionStartTime();
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
