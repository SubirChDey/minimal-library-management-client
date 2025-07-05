import { api } from '../../redux/api';

export const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: ['Books'],
        }),
        getBook: builder.query({
            query: (id) => `/books/${id}`,
        }),

        createBook: builder.mutation({
            query: (newBook) => ({
                url: '/books',
                method: 'POST',
                body: newBook,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['Books'],
        }),

        updateBook: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Books'],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'],
        }),

        getSingleBook: builder.query({
            query: (id) => `/books/${id}`,
        }),

        borrowSummary: builder.query({
            query: () => '/borrow',
        }),

        borrowBook: builder.mutation({
            query: ({ book, quantity, dueDate, borrowerName }) => ({
                url: `/borrow`,
                method: 'POST',
                body: { book, quantity, dueDate, borrowerName },
            }),
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useBorrowBookMutation,
    useBorrowSummaryQuery,
    useGetSingleBookQuery,
} = bookApi;
