import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";

import styles from "../../styles/component/filterProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  productSelector,
  clearFilter,
} from "../../redux/productReducer/productReducer.jsx";

export function FilterProduct() {
  const { isFiltered, filterObj } = useSelector(productSelector);
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false); // 👈 NEW STATE

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(75000);

  const [category, setCategory] = useState({
    mensCloth: false,
    womansCloth: false,
    Mobile: false,
    electronic: false,
    Clothing: false,
    "Home & Garden": false,
    Automotive: false,
    "Health & Beauty": false,
    "Sports & Outdoors": false,
    "Toys & Games": false,
    "Books & Media": false,
    jewellary: false,
    "Food & Grocery": false,
    Furniture: false,
    Shoes: false,
    "Pet Supplies": false,
    "Office Supplies": false,
    "Baby & Kids": false,
    "Art & Collectibles": false,
    "Travel & Luggage": false,
    "Music Instruments": false,
    "Electrical Appliances": false,
    "Handmade Crafts": false,
  });

  const handleCategoryChange = (key, checked) => {
    setCategory((prev) => ({ ...prev, [key]: checked }));
  };

  const handleApplyFilters = () => {
    const selectedCategories = Object.keys(category).filter(
      (cat) => category[cat]
    );

    dispatch(
      fetchProducts({
        minPrice,
        maxPrice,
        category: selectedCategories,
      })
    );
  };

  const handleClearFilters = () => {
    dispatch(clearFilter());
    dispatch(fetchProducts({ page: 1 }));
  };

  useEffect(() => {
    if (filterObj.price !== undefined) {
      setMaxPrice(filterObj.price);
    }

    const updatedCategories = {};
    for (const key in category) updatedCategories[key] = false;

    if (Array.isArray(filterObj?.category)) {
      filterObj.category.forEach((cat) => {
        if (updatedCategories.hasOwnProperty(cat)) {
          updatedCategories[cat] = true;
        }
      });
    }

    setCategory(updatedCategories);
  }, [filterObj.price, filterObj.category]);

  return (
    <>
      {/* 👇 FILTER ICON (visible only under 853px) */}
      <CiFilter
        className={styles.filterIcon}
        onClick={() => setShowFilter(!showFilter)}
      />

      {/* 👇 Condition for mobile: only show when showFilter = true */}
      <div
        className={`${styles.filterContainer} ${
          showFilter ? styles.show : styles.hide
        }`}
      >
        <h2 className={styles.filterTitle}>🔍 Filter Products</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* PRICE */}
          <div className={styles.priceSection}>
            <label className={styles.priceLabel}>
              Show products ₹{maxPrice}
            </label>

            <input
              type="range"
              min="0"
              max="100000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className={styles.priceRange}
            />
          </div>

          {/* CATEGORY */}
          <h3 className={styles.categoryTitle}>Categories</h3>

          <div className={styles.categoryContainer}>
            {Object.keys(category).map((key) => (
              <label key={key} className={styles.categoryItem}>
                <input
                  type="checkbox"
                  checked={category[key]}
                  onChange={(e) =>
                    handleCategoryChange(key, e.target.checked)
                  }
                />
                <span>{key}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterButtons}>
            <button
              type="button"
              onClick={handleApplyFilters}
              className={styles.applyBtn}
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={handleClearFilters}
              className={styles.clearBtn}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
