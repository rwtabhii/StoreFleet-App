import { useSelector } from "react-redux";
import { ProuctItem } from "../productItem/productItem"
import "./productList.css"
import { productSelector } from "../../../redux/productReducer/productReducer";



export function ProductList() {
    const {showProducts} = useSelector(productSelector);

    return (
        <div className="productList">
           {
            showProducts.map((product)=> 
            <ProuctItem key={product.id} product={product}/>)
           }
        </div>
    );
}