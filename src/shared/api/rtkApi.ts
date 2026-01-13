import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery: BaseQueryFn<void, unknown, SerializedError> = async () => {
    return { data: undefined };
};
export const api = createApi({

    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
})