import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductApi } from "../../api/products/products";

const initialState = {
  allProducts: [],
  showProducts: [],
  searchProducts: [],
  previousSearchProducts: [],
  filterObj: {
    maxPrice: 75000,
    category: [], // {electronics: true, fashion: false}
    keyword: "",
  },
  isLoading: false,
  error: null,

  // for pagination 
  currentPage: 1,
  totalPages: 0,
  totalProducts: 0,
  isFiltered: false
};

// --- Using createAsyncThunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (data, thunkAPI) => {
    try {
      console.log(data, "thunk")
      const products = await getProductApi(data);
      // ✅ detect if filters exist (price, category, search)
      console.log(products, "products")
      const hasFilter =
        (data.maxPrice !== undefined && data.maxPrice < 75000) ||
        (data.category && data.category.length > 0) ||
        (data.keyword && data.keyword.trim() !== "");


      if (hasFilter) { thunkAPI.dispatch(setFilterState({ isFiltered: hasFilter, price: data.maxPrice, category: data.category, keyword: data.keyword }));; }

      return products;
    } catch (err) {
      console.log(err);
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
    setFilterState: (state, action) => {
      const { isFiltered, price, category } = action.payload;
      state.isFiltered = isFiltered;

      if (price !== undefined && price !== null) {
        state.filterObj.maxPrice = price;
      }

      if (category !== undefined) {
        state.filterObj.category = category;
      }
    },

    //filterProduct: (state, action) => {

    // // merge new filter values into filterObj
    // state.filterObj = { ...state.filterObj, ...action.payload };

    // const { price, categories, search } = state.filterObj;
    // let filtered = [...state.allProducts];

    // // filter by price
    // if (price !== null && price !== undefined) {
    //   filtered = filtered.filter((p) => p.price <= price);
    // }

    // // filter by categories
    // const activeCategories = Object.keys(categories || {}).filter(
    //   (c) => categories[c] === true
    // );
    // if (activeCategories.length > 0) {
    //   filtered = filtered.filter((p) => activeCategories.includes(p.category));
    // }

    // // filter by search
    // if (search && search.trim() !== "") {
    //   const query = search.toLowerCase().trim();
    //   filtered = filtered.filter((p) =>
    //     p.title.toLowerCase().includes(query)
    //   );
    // }

    // state.showProducts = filtered;
    // state.searchProducts = filtered;
    //},
    // search: (state, action) => {
    //   const query = action.payload.toLowerCase().trim();
    //   if (query === "") {
    //     state.showProducts = state.previousSearchProducts;
    //   } else {
    //     const searchProduct = state.allProducts.filter((product) =>
    //       product.title.toLowerCase().includes(query)
    //     );
    //     state.showProducts = searchProduct;
    //   }
    // },
    clearFilter: (state, action) => {
      state.isFiltered = false
      state.filterObj.category = []
      state.filterObj.maxPrice = 75000
      state.filterObj.keyword = ""
    }
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
        // ✅ Extract products from the response object
        // const { getProduct = [], currentPage, totalPage, totalProducts } = action.payload;
        state.allProducts = action.payload.getProduct;
        if (!state.isFiltered) {
          state.showProducts = action.payload.getProduct;
        } else {
          // filter results come already filtered from backend
          state.showProducts = action.payload.getProduct;
        }
        state.previousSearchProducts = action.payload.getProduct;
        // Optional: store pagination info in state
        state.currentPage = action.payload.currentpage;
        state.totalPages = action.payload.totalPage;
        state.totalProducts = action.payload.totalItems;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

// --- Export actions
export const { getProduct, addProduct, search, setFilterState, clearFilter } = productSlice.actions;

// --- Selector
export const productSelector = (state) => state.products;

// --- Export reducer
export const productReducer = productSlice.reducer;
