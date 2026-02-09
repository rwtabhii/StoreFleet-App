import { useEffect } from "react";
import { GridLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem } from "../productItem/productItem.jsx";
import styles from "../../../styles/component/productList.module.css";
import { productSelector, fetchProducts } from "../../../redux/productReducer/productReducer.jsx";

export function ProductList({ searchTerm }) {
  const dispatch = useDispatch();
  const { showProducts, isLoading, error, isFiltered, filterObj, currentPage, totalPages } = useSelector(productSelector);

  //  run only when filters/search change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        dispatch(fetchProducts({ ...filterObj, keyword: searchTerm, page: 1 }));
        console.log("search product")
      } else if (isFiltered) {
        dispatch(fetchProducts({ ...filterObj, page: 1 }));
        console.log("filter ")
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, isFiltered, filterObj, dispatch]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch(fetchProducts({ ...filterObj, page }));
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <GridLoader color="#36d7b7" loading={isLoading} size={20} />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          ❌ Failed to fetch products: {error}
        </div>
      ) : (<div className={styles.productList}>
        {showProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>)}
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
              className={currentPage === idx + 1 ? styles.active : ""}
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


    </div>

  );
}
