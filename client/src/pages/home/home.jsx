import { useEffect } from "react";
import { GridLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

import { FilterProduct } from "../../component/filterProducts/filterProducts";
import { ProductList } from "../../component/product/productList/productList";
import "./home.css";

import { fetchProducts,  productSelector, search, } from "../../redux/productReducer/productReducer";

export function Home() {
  const dispatch = useDispatch();
  const {filterObj} = useSelector(productSelector);
  const { isLoading, error, currentPage, totalPages,totalProducts,isFiltered } = useSelector(productSelector);
  // console.log(currentPage);

  // Fetch products on initial render
  useEffect(() => {
    if(!isFiltered){
      console.log("all product fetch is working");
    dispatch(fetchProducts({ page: 1 }));
}  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch(fetchProducts({...filterObj, page }));
  };

  return (
    <div className="homecontainer">
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
                dispatch(search({ search: e.target.value }))
              }
            />
          </div>

          {/* Product Listing */}
          <div className="products">
            <FilterProduct />
            <ProductList />
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>


            {/* you can do this same thing with the forloop  to make the array and then iterate in the array to add the button  */}
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
