import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

import { FilterProduct } from "../../component/filterProducts/filterProducts.jsx";
import { ProductList } from "../../component/product/productList/productList.jsx";
import { CrouselProduct } from "../../component/product/crouselProduct/CrouselProduct.jsx";
import styles from "../../styles/pages/home.module.css";
import { fetchProducts, productSelector } from "../../redux/productReducer/productReducer.jsx";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { filterObj } = useSelector(productSelector);
  const { isLoading, error, currentPage, totalPages, isFiltered } = useSelector(productSelector);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        dispatch(fetchProducts({ ...filterObj, keyword: searchTerm, page: 1 }));
      } else if (isFiltered) {
        dispatch(fetchProducts({ ...filterObj, page: 1 }));
      } else {
        dispatch(fetchProducts({ page: 1 }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, isFiltered, filterObj, dispatch]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch(fetchProducts({ ...filterObj, page }));
  };

  return (
    <div className={styles.homeContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <GridLoader color="#36d7b7" loading={isLoading} size={20} />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          ❌ Failed to fetch products: {error}
        </div>
      ) : (
        <>
          <div className={styles.searchBar}>
            <input
              type="search"
              placeholder="Search products..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.products}>
            <FilterProduct />
            <ProductList />
            <CrouselProduct />
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span className={styles.mobilePageIndicator}>
              Page {currentPage} of {totalPages}
            </span>
           <div className={styles.pagenumber}> 
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            </div>

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
