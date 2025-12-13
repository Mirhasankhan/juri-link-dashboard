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
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
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
    analysis: builder.query({
      query: () => ({
        url: "/users/analysis",
        method: "GET",
      }),
    }),

    resetPassword: builder.mutation({
      query: (data: { password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
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

  useAnalysisQuery,
} = authApi;
