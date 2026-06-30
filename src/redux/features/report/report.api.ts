import baseApi from "@/redux/api/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reports: builder.query({
      query: ({status, page}) => ({
        url: `/admin/reports?status=${status}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["report"],
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

export const { useReportsQuery, useResponseReportMutation } = reportApi;
