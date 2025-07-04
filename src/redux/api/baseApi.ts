import type { GetBooksQueryArg, IBooksResponse } from "@/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-server-delta.vercel.app/api" }),
  tagTypes: ["books", "editBook"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, GetBooksQueryArg>({
      query: ({ limit = 10, currentPage = 0 } = {}) => ({
        url: `/books?limit=${limit}&currentPage=${currentPage}`,
      }),
      providesTags: ["books"],
    }),

    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags:["editBook"],
    }),

    editBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["books", "editBook"],
    }),

    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["books","editBook"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    getBorrowSummary: builder.query({
      query: () => "/borrow",
    }),

    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useEditBookMutation,
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBorrowSummaryQuery,
  useCreateBookMutation,
} = baseApi;
