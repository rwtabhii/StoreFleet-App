import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItemApi,
  removeCartItemApi,
  updateCartItemApi,
  addCartItemApi,
} from "../../api/cart/cart";

// 1️⃣ Adapter
const cartAdapter = createEntityAdapter({
  selectId: (item) => item.id,
});

// 2️⃣ Initial state
const initialState = cartAdapter.getInitialState({
  isLoading: false,
  error: null,
});

// 3️⃣ Async thunks

// Fetch all cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, thunkAPI) => {
    try {
      const cartItems = await getCartItemApi(userId);
      return cartItems;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch cart items");
    }
  }
);

// Add a cart item
export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async (item, thunkAPI) => {
    try {
      const addedItem = await addCartItemApi(item);
      return addedItem; // should return the saved item with id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to add cart item");
    }
  }
);

// Remove a cart item
export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (item, thunkAPI) => {
    try {
      await removeCartItemApi(item);
      return item.id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to remove cart item");
    }
  }
);

// Update quantity of a cart item
export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemAsync",
  async ({ id, type }, thunkAPI) => {
    try {
      await updateCartItemApi(id, type);
      return { id, type };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to update cart item");
    }
  }
);

// 4️⃣ Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      cartAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        cartAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Cart Item
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        cartAdapter.addOne(state, action.payload);
      })

      // Remove Cart Item
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        cartAdapter.removeOne(state, action.payload);
      })

      // Update Quantity
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const { id, type } = action.payload;
        const item = state.entities[id];
        if (!item) return;

        if (type === "increment") {
          item.quantity += 1;
        } else if (type === "decrement") {
          if (item.quantity <= 1) {
            // remove if quantity would go to 0
            cartAdapter.removeOne(state, id);
          } else {
            item.quantity -= 1;
          }
        }
      });
  },
});

// 5️⃣ Export selectors & reducer
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
} = cartAdapter.getSelectors((state) => state.cart);

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cart;
