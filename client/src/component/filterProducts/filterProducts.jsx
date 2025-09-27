import { useEffect, useState,useRef } from "react";
import "./filterProduct.css"
import { useDispatch } from "react-redux";
import { filterProduct } from "../../redux/productReducer/productReducer";

export function FilterProduct() {
    const [price, setPrice] = useState(75000);
    const [categories, setCategories] = useState({
        mensCloth: false,
        womansCloth: false,
        jewellary: false,
        electronic: false
    })
    const dispatch = useDispatch()
    // console.log(categories);
    // 🟢 this ref prevents dispatch on initial render
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            dispatch(filterProduct({price,categories}))
        } else {
            didMount.current = true;
        }
    }, [price, categories]);

    return (
        <div className="filter-container">
            <h2>Filter</h2>
            <form className="filterSidebar">
                {/* Price Slider */}
                <label htmlFor="price">
                    Price: ₹{price}
                </label>
                <input
                    type="range"
                    id="price"
                    name="price"
                    min="1"
                    max="100000"
                    step="10"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="priceRange"
                />
                <h2 className="catergory">Category</h2>
                <div className="categoryContainer">
                    <div>
                        <input
                            type="checkbox"
                            id="mensFashion"
                            name="mensFashion"
                            onChange={(e) => {
                                setCategories((prevCategory) => (
                                    { ...prevCategory, mensCloth: e.target.checked }
                                ))
                            }}
                        />
                        <label htmlFor="mensFashion">Men's Clothing</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="womensFashion"
                            name="womensFashion"
                            onChange={(e) => {
                                setCategories((prevCategory) => (
                                    { ...prevCategory, womansCloth: e.target.checked }
                                ))
                            }}
                        />
                        <label htmlFor="womensFashion">Women's Clothing</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="jewelery"
                            name="jewelery"
                            onChange={(e) => {
                                setCategories((prevCategory) => (
                                    { ...prevCategory, jewellary: e.target.checked }
                                ))
                            }}
                        />
                        <label htmlFor="jewelery">Jewelery</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="electronics"
                            name="electronics"
                            onChange={(e) => {
                                setCategories((prevCategory) => (
                                    { ...prevCategory, electronic: e.target.checked }
                                ))
                            }}
                        />
                        <label htmlFor="electronics">Electronics</label>
                    </div>
                </div>
            </form>
        </div>
    )
}