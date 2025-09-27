import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductApi } from "../../api/products/products";

const initialState = {
  allProducts: [],
  showProducts: [],
  searchProducts: [],
  previousSearchProducts: [],
  filterObj: {
    price: 75000,
    categories: {}, // {electronics: true, fashion: false}
    search: "",
  },
  isLoading: false,
  error: null,
};

// --- Using createAsyncThunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
       const products = await getProductApi(); 
      return products;    
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.allProducts = action.payload;
      state.showProducts = action.payload;
      state.previousSearchProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.allProducts.push(action.payload);
      state.showProducts.push(action.payload);
    },
    filterProduct: (state, action) => {
      // merge new filter values into filterObj
      state.filterObj = { ...state.filterObj, ...action.payload };

      const { price, categories, search } = state.filterObj;
      let filtered = [...state.allProducts];

      // filter by price
      if (price !== null && price !== undefined) {
        filtered = filtered.filter((p) => p.price <= price);
      }

      // filter by categories
      const activeCategories = Object.keys(categories || {}).filter(
        (c) => categories[c] === true
      );
      if (activeCategories.length > 0) {
        filtered = filtered.filter((p) => activeCategories.includes(p.category));
      }

      // filter by search
      if (search && search.trim() !== "") {
        const query = search.toLowerCase().trim();
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(query)
        );
      }

      state.showProducts = filtered;
      state.searchProducts = filtered;
    },
    search: (state, action) => {
      const query = action.payload.toLowerCase().trim();
      if (query === "") {
        state.showProducts = state.previousSearchProducts;
      } else {
        const searchProduct = state.allProducts.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
        state.showProducts = searchProduct;
      }
    },
  },

  // --- Handle async thunk lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allProducts = action.payload;
        state.showProducts = action.payload;
        state.previousSearchProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

// --- Export actions
export const { getProduct, addProduct, filterProduct, search } = productSlice.actions;

// --- Selector
export const productSelector = (state) => state.products;

// --- Export reducer
export const productReducer = productSlice.reducer;
