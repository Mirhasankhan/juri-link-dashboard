import baseApi from "@/redux/api/baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    overview: builder.query({
      query: () => ({
        url: `/admin/overview`,
        method: "GET",
      }),
    }),
    responseReport: builder.mutation({
      query: (data) => ({
        url: `/admin/response-report`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),
  }),
});

export const { useOverviewQuery, useResponseReportMutation } = overviewApi;
