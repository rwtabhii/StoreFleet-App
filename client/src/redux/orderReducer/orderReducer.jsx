import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderApi, getUserOrderByAdmin, showAllOrders, updateOrderApi } from "../../api/order/orderApi";

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

export const fetchAllOrderByAdmin = createAsyncThunk(
  "orders/fetchAllOrderByAdmin", async (_, thunkAPI) => {
    try {
      const allOrders = await showAllOrders();
      return allOrders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
)
export const updateOrderByAdmin = createAsyncThunk(
  "orders/updateOrderByAdmin",
  async ({ id, update }, { getState, dispatch, rejectWithValue }) => {
    try {
      const data = await updateOrderApi(id, update);
      return data;
    } catch (err) {
      dispatch(revertOrderUpdate({ orderId: id, prevOrder }));
      return rejectWithValue(err.response?.data?.message || "Failed to update order");
    }
  }
);

export const fetchUserOrderByAdmin = createAsyncThunk(
  "orders/fetchUserOrderByAdmin",
  async (userId, thunkAPI) => {
    try {
      const response = await getUserOrderByAdmin(userId);
      // Assuming API returns { success: true, orders: [...] }
      return response.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || "Failed to fetch orders");
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
    updateOrderLocally: (state, action) => {
      const { id, update } = action.payload;
      state.orders = state.orders.map(order => {
        if (order._id !== id) return order;

        return {
          ...order,
          orderStatus: update.orderStatus ?? order.orderStatus,
          paymentInfo: {
            ...order.paymentInfo,
            status: update.paymentInfo?.status ?? order.paymentInfo?.status,
          },
        };
      });
    },

    revertOrderUpdate: (state, action) => {
      const { orderId, prevOrder } = action.payload;
      const index = state.orders.findIndex((o) => o._id === orderId);
      if (index !== -1) {
        state.orders[index] = prevOrder;
      }
    }
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
      })
      .addCase(fetchAllOrderByAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrderByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrderByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrderByAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orders = []
      })
      .addCase(fetchUserOrderByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setOrders, clearOrders, updateOrderLocally, revertOrderUpdate } = orderSlice.actions;
export const orderSelector = (state) => state.order;
export const orderReducer = orderSlice.reducer;
