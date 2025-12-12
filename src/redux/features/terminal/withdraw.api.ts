import baseApi from "@/redux/api/baseApi";

const withdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    withdrawRequests: builder.query({
      query: () => ({
        url: "/admin/withdraw-requests",
        method: "GET",
      }),
      providesTags: ["withdraw"],
    }),
    acceptRequest: builder.mutation({
      query: (id: string) => ({
        url: `/admin/withdraw-request/accept/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["withdraw"],
    }),
  }),
});

export const { useWithdrawRequestsQuery, useAcceptRequestMutation } = withdrawApi;
