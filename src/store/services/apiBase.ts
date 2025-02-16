import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { setSessionExpired } from "store/slices/session";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const baseQuery: BaseQueryFn = async (
  { url, method, body, headers },
  api,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    /**
     * Handle log out if unauthorized response is received
     */
    if (response.status === 401) {
      api.dispatch(setSessionExpired());
      throw new Error("Session inactive");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText}`);
    }

    const contentType = response.headers.get("Content-Type")?.toLowerCase();

    // Handle text/plain response (non-JSON response)
    if (contentType?.includes("text/plain")) {
      const text = await response.text();
      return { data: text };
    }

    return { data: await response.json() };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
