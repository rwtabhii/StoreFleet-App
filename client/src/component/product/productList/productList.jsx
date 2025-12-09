import { useSelector } from "react-redux";
import { ProductItem } from "../productItem/productItem.jsx";
import styles from "../../../styles/component/productList.module.css";
import { productSelector } from "../../../redux/productReducer/productReducer.jsx";

export function ProductList() {
  const { showProducts } = useSelector(productSelector);

  return (
    <div className={styles.productList}>
      {showProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
