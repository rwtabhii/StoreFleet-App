import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItemApi,
  addCartItemApi,
  removeCartItemApi,
  updateCartItemApi,
} from "../../api/cart/cart";

// -------------------- Async Thunks --------------------

// Fetch all cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    try {
      console.log("thunk")
      const res = await getCartItemApi();
      // Make sure we return just the array of items
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart items");
    }
  }
);

// Add a cart item
export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async (item, thunkAPI) => {
    try {
      const res = await addCartItemApi(item);
      return res.cartItem; // Expect backend to send added item
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add cart item");
    }
  }
);

// Remove a cart item
export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (id, thunkAPI) => {
    try {
      await removeCartItemApi(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to remove cart item");
    }
  }
);

// Update quantity
export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemAsync",
  async ({ id, type }, thunkAPI) => {
    try {
      console.log("thunk invoke update")
      const res = await updateCartItemApi(id, type);
      console.log("thunk return", res)
      return res; // Expect updated item
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update cart item");
    }
  }
);

// -------------------- Slice --------------------

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantityOptimistic: (state, action) => {
      const { id, type } = action.payload;
      console.log(action.payload)
      const itemIndex = state.items.findIndex(i => i._id === id);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        // Save previous quantity for rollback
        if (item._previousQuantity === undefined) {
          item._previousQuantity = item.quantity;
        }

        if (type === "increment") {
          item.quantity += 1;
        } else if (type === "decrement") {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // Remove item from state if quantity goes to 0
            state.items.splice(itemIndex, 1);
          }
        }
      }
    },
    removeCartItemOptimistic: (state,action)=>{
     state.items = state.items.filter((item) => item._id !== action.payload);
    }

    
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Remove
      // .addCase(removeCartItemAsync.fulfilled, (state, action) => {
      //   state.items = state.items.filter((item) => item._id !== action.payload);
      // })

      
  },
});

// -------------------- Exports --------------------

export const { clearCart,updateQuantityOptimistic,removeCartItemOptimistic } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const selectCart = (state) => state.cart;
