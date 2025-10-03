import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderApi } from "../../api/order/orderApi";

// Initial state
const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

//  Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const orders = await getOrderApi();
      return orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setOrders, clearOrders } = orderSlice.actions;
export const orderSelector = (state) => state.order;
export const orderReducer = orderSlice.reducer;
