import { ProductCard } from "../productCard/productCard"
import "./productItem.css"

export function ProuctItem({ product }) {

    return (
        <div className="productItem">
            <ProductCard product={product} />
        </div>
    );
}