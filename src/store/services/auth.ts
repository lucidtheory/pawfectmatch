import { createApi,  } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiBase';
import { LoginParams } from './types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<
        LoginParams,
        void
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body, 
      }),
    }),
    logout: builder.mutation<void, void>({
        query: () => ({
            url: '/auth/logout',
            method: 'POST',
        }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
