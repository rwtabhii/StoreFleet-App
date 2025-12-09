import { useSelector } from "react-redux"
import { OrderTable } from "../orderTable"
import { orderSelector } from "../../../redux/orderReducer/orderReducer.jsx"





export function OrderList({order}) {
   const {orders} = useSelector(orderSelector)
    // console.log(orders, "orders in orderlist");

    return (<>        {
        orders?.map((o) => (
            <OrderTable key={o.id} order={o} />
        ))
    }
    </>

    )
}