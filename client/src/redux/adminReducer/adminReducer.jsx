// src/redux/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allUserDetail, deleteUser, updateUserRoleApi } from "../../api/users/users";

// -----------------------------
// Async thunks
// -----------------------------

export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async () => {
  const data = await allUserDetail();
  return data;
});

export const removeUser = createAsyncThunk(
  "admin/removeUser",
  async (userId, { getState, dispatch, rejectWithValue }) => {
    // Backup current users for rollback
    const prevUsers = getState().admin.allUsers;

    try {
      // Optimistically remove user from UI first
      dispatch(adminSlice.actions.removeUserLocally(userId));

      // Try API call
      await deleteUser(userId)
      return userId; // confirmed deleted
    } catch (err) {
      // Rollback UI if API fails
      dispatch(adminSlice.actions.restoreUsers(prevUsers));
      return rejectWithValue(err.message);
    }
  }
);
// data will contain { userId, newRole }
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      
      // Call your backend API
      const updatedUser = await updateUserRoleApi({ id, role });
      return updatedUser; // goes to action.payload in fulfilled case
    } catch (error) {
      // Send error to reducer via rejectWithValue
      return rejectWithValue(error.response?.data?.message || "Failed to update role");
    }
  }
);
// -----------------------------
// Slice
// -----------------------------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeUserLocally: (state, action) => {
      state.allUsers = state.allUsers.filter(u => u._id !== action.payload);
    },
    restoreUsers: (state, action) => {
      state.allUsers = action.payload; // rollback state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 🟡 Update user role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        // Update that specific user in allUsers array
        state.allUsers = state.allUsers.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update role";
      });
  },
});

export const { removeUserLocally, restoreUsers } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
export const adminSelector = (state) => state.admin
