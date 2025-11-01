import { useState, useEffect } from "react";
import "./filterProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, productSelector, clearFilter } from "../../redux/productReducer/productReducer";

export function FilterProduct() {
  const { isFiltered, filterObj } = useSelector(productSelector);
  const dispatch = useDispatch();
  console.log("filterObject is ", filterObj)

  // --- Local state
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

  // --- Handle category toggle
  const handleCategoryChange = (key, checked) => {
    setCategory((prev) => ({ ...prev, [key]: checked }));
  };

  // --- Apply filters (fetch with both price & category)
  const handleApplyFilters = () => {
    const selectedCategories = Object.keys(category).filter((cat) => category[cat]);
    const filterData = {
      minPrice, // ✅ same key name your backend expects
      maxPrice,
      category: selectedCategories, // ✅ same key name your backend expects
    };
    // console.log(filterData,"component")
    dispatch(fetchProducts(filterData));
  };

  // --- Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilter())
    dispatch(fetchProducts({ page: 1 })); // fetch all products
  };


  useEffect(() => {
    if (filterObj.price !== undefined && filterObj.price !== null) {
      setMaxPrice(filterObj.price);
    }
    // 🧩 Sync category
    const updatedCategories = {};
    for (const key in category) {
      updatedCategories[key] = false;
    }

    if (Array.isArray(filterObj?.category)) {
      filterObj.category.forEach(cat => {
        if (updatedCategories.hasOwnProperty(cat)) {
          updatedCategories[cat] = true;
        }
      });
    }

    setCategory(updatedCategories);
  }, [filterObj.price, filterObj.category]);

  return (
    <div className="filter-container">
      <h2 className="filter-title">🔍 Filter Products</h2>

      <form className="filterSidebar" onSubmit={(e) => e.preventDefault()}>
        {/* 💰 Price Filter */}
        <div className="price-section">
          <label className="price-label">Show products ₹{maxPrice}</label>
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="priceSlider"
          />
        </div>

        {/* 🧩 Categories */}
        <h3 className="category-title">Categories</h3>
        <div className="categoryContainer">
          {Object.keys(category).map((key) => (
            <label key={key} className="category-item">
              <input
                type="checkbox"
                checked={category[key]}
                onChange={(e) => handleCategoryChange(key, e.target.checked)}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>

        {/* 🔘 Buttons */}
        <div className="filterButtons">
          <button
            type="button"
            onClick={handleApplyFilters}
            className="apply-btn"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="clear-btn"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
