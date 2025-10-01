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
    return response.data; // return response if needed
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