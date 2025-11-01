import axios from "axios";

export async function getProductApi(data = {}) {
    try {
        const { page = 1,
            keyword = "",
            category = "",
            minPrice = null,
            maxPrice = null,
            rating = null } = data
        // console.log(data);
        const params = { page, category, rating, keyword }
        if (minPrice) params["price[gte]"] = minPrice;
        if (maxPrice) params["price[lte]"] = maxPrice;
        console.log(params);
        const response = await axios.get("http://localhost:3000/api/storefleet/product/products", {
            params,
            withCredentials: true
        });

        return response.data
    } catch (error) {
        console.log(error);
    }
}





// for adding the product
// export function addDoc() {

// }

// export async function getFilteredProducts(filter = {}) {
//   try {
//     let q = collection(db, "products");

//     // Apply category filter
//     if (filter.categories?.length === 1) {
//       q = query(q, where("category", "==", filter.categories[0]));
//     } else if (filter.categories?.length > 1) {
//       q = query(q, where("category", "in", filter.categories));
//       // OR if you stored category as array in Firestore:
//       // q = query(q, where("category", "array-contains-any", filter.categories));
//     }

//     // Apply price filter
//     if (filter.maxPrice) {
//       q = query(q, where("price", "<=", filter.maxPrice));
//     }

//     // Run query
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (err) {
//     console.error("Error filtering products:", err);
//     return [];
//   }
// } 