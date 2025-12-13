import baseApi from "@/redux/api/baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: `/admin/all-users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    allLawyers: builder.query({
      query: () => ({
        url: `/admin/all-lawyers`,
        method: "GET",
      }),
      providesTags: ["User"],
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
} = useApi;
