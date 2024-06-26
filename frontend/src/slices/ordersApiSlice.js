import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        method: "POST",
        body: { ...order },
        url: ORDERS_URL,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
