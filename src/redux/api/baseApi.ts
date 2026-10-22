/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import Cookies from "js-cookie";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://api.passit.smtsigma.com/api/v1";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      let token = state.auth?.accessToken;

      if (!token && typeof window !== "undefined") {
        token = Cookies.get("token") || "";
      }

      if (token && token !== "null" && token !== "undefined") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User","withdraw","service", "report"],
  endpoints: (builder) => ({}),
});

export default baseApi;
