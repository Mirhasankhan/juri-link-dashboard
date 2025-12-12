import baseApi from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createSubCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/sub-category/create/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terminal"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    getServices: builder.query({
      query: (id) => ({
        url: `/sub-category/sub/admin?categoryId=${id}`,
        method: "GET",
      }),
      providesTags: ["Terminal"],
    }),
    setProfile: builder.mutation({
      query: (body) => ({
        url: `/auth/set-profile`,
        method: "PUT",
        body:body
      }),
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetCategoriesQuery,
  useGetServicesQuery,
  useSetProfileMutation
} = categoryApi;
