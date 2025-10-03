import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import { OrderList } from "../../component/order/orderList/orderList";
import { authSelector } from "../../redux/authReducer/authReducer";
import { fetchOrders, orderSelector } from "../../redux/orderReducer/orderReducer";
import "./orderPage.css";

export function OrderPage() {
  const dispatch = useDispatch();
  const { userDetail } = useSelector(authSelector);
  const { orders, isLoading, error } = useSelector(orderSelector);
  // console.log(orders, "orders in orderpage");

  useEffect(() => {
    if (userDetail?.user._id) {
      dispatch(fetchOrders()); // fetch orders via thunk
    }
  }, [userDetail?.uid, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <GridLoader color="#36d7b7" loading={isLoading} size={20} />
        </div>
      ) : error ? (
        <p>❌ {error}</p>
      ) : (
        <div className="order-container">
          <div className="heading">Your Orders :</div>
            <OrderList  />
        </div>
      )}
    </>
  );
}
