import { api } from '../../redux/api';

export const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({ page = 1, limit = 10, filter, sortBy, sort }) => {
                const params = new URLSearchParams();

                params.append('page', String(page));
                params.append('limit', String(limit));

                if (filter) params.append('filter', filter);
                if (sortBy) params.append('sortBy', sortBy);
                if (sort) params.append('sort', sort);

                return `/books?${params.toString()}`;
            },
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
            providesTags: ['Borrows'],
        }),

        borrowBook: builder.mutation({
            query: ({ book, quantity, dueDate, borrowerName }) => ({
                url: `/borrow`,
                method: 'POST',
                body: { book, quantity, dueDate, borrowerName },
            }),
            invalidatesTags: ['Borrows'],
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
