
import { api } from '../api';

export const borrowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (data) => ({
        url: '/borrows',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    getBorrowSummary: builder.query({
      query: () => '/borrows/summary',
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
