import baseApi from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    services: builder.query({
      query: () => ({
        url: "/legal-service",
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: `/legal-service/create`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const { useServicesQuery, useCreateServiceMutation } = serviceApi;
