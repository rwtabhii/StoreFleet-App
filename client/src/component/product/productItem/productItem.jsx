import { ProductCard } from "../productCard/productCard.jsx";
import styles from "../../../styles/component/productItem.module.css";

export function ProductItem({ product }) {
  return (
    <div className={styles.productItem}>
      <ProductCard product={product} />
    </div>
  );
}
