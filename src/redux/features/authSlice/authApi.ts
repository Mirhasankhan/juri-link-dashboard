import baseApi from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    userrsByTime: builder.query({
      query: (type) => ({
        url: `/users/time?type=${type}`,
        method: "GET",
      }),
    }),
   
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: email,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/admin/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    verifyOtp: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { password?: string; newPassword?: string; token?: string }) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: { newPassword: data.newPassword || data.password },
        headers: data.token ? { Authorization: data.token } : undefined,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useUserrsByTimeQuery,
  useGetMeQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = authApi;
