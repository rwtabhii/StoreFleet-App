import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/users/users";
  

const initialState = {
  login: false,
  userDetail: null,
  isLoading: false,
  error: null,
};

// user registration operation
export const registerUserAsync = createAsyncThunk(
  "auth/registerUserAsync",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await registerUser({ name, email, password });
      // Assume backend returns the user object
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Registration failed");
    }
  }
);
// login operation 
export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await loginUser({ email, password });
      console.log(user)
      return user; // return user data to update Redux
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    logout: (state) => {
      state.login = false;
      state.userDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = true;
        state.userDetail = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setLogin,logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
