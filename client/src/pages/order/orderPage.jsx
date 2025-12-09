import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import { OrderList } from "../../component/order/orderList/orderList.jsx";
import { authSelector } from "../../redux/authReducer/authReducer.jsx";
import { fetchOrders, orderSelector } from "../../redux/orderReducer/orderReducer.jsx";
import styles from "../../styles/pages/orderPage.module.css";

export function OrderPage() {
  const dispatch = useDispatch();
  const { userDetail } = useSelector(authSelector);
  const { orders, isLoading, error } = useSelector(orderSelector);

  useEffect(() => {
    if (userDetail?.user._id) {
      dispatch(fetchOrders());
    }
  }, [userDetail?.uid, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <GridLoader color="#36d7b7" loading={isLoading} size={20} />
        </div>
      ) : error ? (
        <p className={styles.errorMessage}>❌ {error}</p>
      ) : (
        <div className={styles.orderContainer}>
          <div className={styles.heading}>Your Orders :</div>
          <OrderList />
        </div>
      )}
    </>
  );
}
