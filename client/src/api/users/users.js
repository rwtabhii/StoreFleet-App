import api from "../api.js";
export async function registerUser(data) {
  try {
    const { name, email, password } = data;
    const response = await api.post("/api/storefleet/user/signup", { name, email, password });
    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to register user:", err.code, err.message);
    throw err;
  }
}

export async function loginUser(data) {
  try {
    const { email, password } = data;
    const response = await api.post("/api/storefleet/user/login", { email, password });
    console.log("Login successful:", response.data);
    return response.data;
  } catch (err) {
    console.error("Login failed:", err.message);
    throw err;
  }
}

export async function logoutUser() {
  try {
    const response = await api.post("/api/storefleet/user/logout", {});
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (err) {
    console.error("Logout failed:", err.response?.data || err.message);
    throw err;
  }
}

export const forgetPasswordApi = async (email) => {
  try {
    const res = await api.post("/api/storefleet/user/password/forget", { email });
    return res.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

export const resetPasswordApi = async (payload) => {
  try {
    const { token, password, confirmPassword } = payload;
    const res = await api.put(`/api/storefleet/user/password/reset/${token}`, { password, confirmPassword });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserData = async (data) => {
  try {
    const res = await api.put("/api/storefleet/user/profile/update", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserPassword = async (data) => {
  try {
    const res = await api.put("/api/storefleet/user/password/update", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const allUserDetail = async () => {
  try {
    const res = await api.get("/api/storefleet/user/admin/allusers");
    return res.data.allUsers;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/api/storefleet/user/admin/delete/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateUserRoleApi = async (data) => {
  try {
    const { id, role } = data;
    const res = await api.put(`/api/storefleet/user/admin/update/${id}`, { role });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};