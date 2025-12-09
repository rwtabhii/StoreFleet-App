import api from "../api.js";
export async function getProductApi(data = {}) {
  try {
    const {
      page = 1,
      keyword = "",
      category = "",
      minPrice = null,
      maxPrice = null,
      rating = null
    } = data;

    const params = { page, category, rating, keyword };
    if (minPrice) params["price[gte]"] = minPrice;
    if (maxPrice) params["price[lte]"] = maxPrice;

    console.log("Query params:", params);

    const response = await api.get("/storefleet/product/products", { params });
    console.log("Products response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
