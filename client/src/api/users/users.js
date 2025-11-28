import axios from "axios";
axios.defaults.withCredentials = true;

export async function registerUser(data) {
  try {
    const { name, email, password } = data;

    // Call your backend API to register the user
    const response = await axios.post("/api/storefleet/user/signup", {
      name,
      email,
      password,
    });
    console.log("User registered successfully:", response.data);
    return response.data;
  }
  catch (err) {
    console.error("Failed to register user:", err.code, err.message);
  }
}

export async function loginUser(data) {
  try {
    const { email, password } = data;

    const response = await axios.post(
      "/api/storefleet/user/login",
      { email, password },
      { withCredentials: true } // ensure cookie is included
    );

    console.log("Login successful:", response.data);
    return response.data; // no need to store token
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post(
      "/api/storefleet/user/logout",
      {},
      { withCredentials: true }
    );

    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}

export const forgetPasswordApi = async (email) => {
  try {
    const res = await axios.post("/api/storefleet/user/password/forget", { email }, {
      withCredentials: true
    });
    return res
  } catch (error) {
    throw error;
  }
}

export const resetPasswordApi = async (payload) => {
  try {
    const { token, password, confirmPassword } = payload
    const res = await axios.put(`/api/storefleet/user/password/reset/${token}`, {
      password,
      confirmPassword
    }, {
      withCredentials: true
    })
    return res
  } catch (error) {
    throw error
  }

}

export const updateUserData = async (data) => {
  try {
    const res = await axios("/api/storefleet/user/profile/update", { data }, {
      withCredentials: true
    })
    return res;
  } catch (error) {
    throw error
  }
}

export const updateUserPassword = async (data) => {
  try {
    const res = await axios.put("/api/storefleet/user/password/update", data, {
      withCredentials: true
    })
    return res;
  } catch (error) {
    throw error
  }
}

export const allUserDetail = async (data) => {
  try {
    const res = await axios.get("/api/storefleet/user/admin/allusers", {
      withCredentials: true
    });
    return res.data.allUsers;
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/api/storefleet/user/admin/delete/${id}`, {
      withCredentials: true
    })
    return res;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export const updateUserRoleApi = async (data) => {
  try {
    console.log(data)
    const { id, role } = data
    const res = await axios.put(`/api/storefleet/user/admin/update/${id}`, { role }, {
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.log(err)
    throw err
  }
}