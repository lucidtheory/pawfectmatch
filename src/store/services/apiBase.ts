import { BaseQueryFn } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const baseQuery: BaseQueryFn = async ({ url, method, body,  headers }) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (response.status === 401) {
    // TODO: Handle log out
    throw new Error('Session inactive');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${errorText}`);
  }

  return response.json();
};