import { useEffect } from "react";
import { GridLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

import { FilterProduct } from "../../component/filterProducts/filterProducts";
import { ProductList } from "../../component/product/productList/productList";
import "./home.css";

import { fetchProducts, filterProduct, productSelector } from "../../redux/productReducer/productReducer";

export function Home() {
  const dispatch = useDispatch();
  
  // Get state directly from Redux
  const { isLoading, error } = useSelector(productSelector);

  // ✅ Fetch products on initial render using thunk
  useEffect(() => {
    dispatch(fetchProducts());   // this triggers pending → fulfilled/rejected
  },[]);

  return (
    <div className="homecontainer">
      {/* Show spinner while fetching */}
      {isLoading ? (
        <div className="spinner-container">
          <GridLoader color="#36d7b7" loading={isLoading} size={20} />
        </div>
      ) : error ? (
        <div className="error-message">
          ❌ Failed to fetch products: {error}
        </div>
      ) : (
        <>
          {/* 🔎 Search Bar */}
          <div className="searchBar">
            <input
              type="search"
              placeholder="Search"
              className="searchInput"
              onChange={(e) =>
                dispatch(filterProduct({ search: e.target.value }))
              }
            />
          </div>

          {/* Product Listing */}
          <div className="products">
            <FilterProduct />
            <ProductList />
          </div>
        </>
      )}
    </div>
  );
}
