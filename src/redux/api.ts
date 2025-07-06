import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-server-sbr.vercel.app/api' }),
  tagTypes: ['Books', 'Borrows'],
  endpoints: () => ({}),
});
