import baseApi from "@/redux/api/baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: (params: { search?: string; page?: number | string } = {}) => {
        const queryParams = new URLSearchParams();
        if (params?.search && params.search !== "undefined") {
          queryParams.append("search", params.search);
        }
        if (params?.page && params.page !== "undefined") {
          queryParams.append("page", String(params.page));
        }
        const qs = queryParams.toString();
        return {
          url: qs ? `/admin/all-users?${qs}` : "/admin/all-users",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    allLawyers: builder.query({
      query: (params: { search?: string; page?: number | string } = {}) => {
        const queryParams = new URLSearchParams();
        if (params?.search && params.search !== "undefined") {
          queryParams.append("search", params.search);
        }
        if (params?.page && params.page !== "undefined") {
          queryParams.append("page", String(params.page));
        }
        const qs = queryParams.toString();
        return {
          url: qs ? `/admin/all-lawyers?${qs}` : "/admin/all-lawyers",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    allAdmins: builder.query({
      query: (params: { search?: string; page?: number | string } = {}) => {
        const queryParams = new URLSearchParams();
        if (params?.search && params.search !== "undefined") {
          queryParams.append("search", params.search);
        }
        if (params?.page && params.page !== "undefined") {
          queryParams.append("page", String(params.page));
        }
        const qs = queryParams.toString();
        return {
          url: qs ? `/admin/all?${qs}` : "/admin/all",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    adminEarnings: builder.query({
      query: () => ({
        url: `/admin/earnings`,
        method: "GET",
      }),
    }),
    blockUnblockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/block-unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllLawyersQuery,
  useDeleteAdminMutation,
  useChangePasswordMutation,
  useCreateAdminMutation,
  useAllAdminsQuery,
  useAdminEarningsQuery,
  useBlockUnblockUserMutation,
} = useApi;
