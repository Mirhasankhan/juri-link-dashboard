import baseApi from "@/redux/api/baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: `/admin/all-users`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    allLawyers: builder.query({
      query: () => ({
        url: `/admin/all-lawyers`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
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
      query: () => ({
        url: `/admin/all`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    adminEarnings: builder.query({
      query: () => ({
        url: `/booking/admin/earnings`,
        method: "GET",
      }),
    }),
    allProvider: builder.query({
      query: () => ({
        url: `/users/providers`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    allBookings: builder.query({
      query: () => ({
        url: `/booking/all`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllLawyersQuery,
  useAllProviderQuery,
  useAllBookingsQuery,
  useDeleteAdminMutation,
  useChangePasswordMutation,
  useCreateAdminMutation,
  useAllAdminsQuery,
  useAdminEarningsQuery,
} = useApi;
