import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilterProduct } from "../../component/filterProducts/filterProducts.jsx"
import { ProductList } from "../../component/product/productList/productList.jsx";
import { CrouselProduct } from "../../component/product/crouselProduct/CrouselProduct.jsx"
import styles from "../../styles/pages/home.module.css";
import { productSelector } from "../../redux/productReducer/productReducer.jsx";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.homeContainer}>
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
        <ProductList searchTerm={searchTerm} />
        <CrouselProduct />
      </div>
    </div>
  )
}
