import { useSelector } from "react-redux"
import { OrderTable } from "../orderTable"
import { orderSelector } from "../../../redux/orderReducer/orderReducer"





export function OrderList() {
   const {orders} = useSelector(orderSelector)
    return (<>        {
        orders?.map((o) => (
            <OrderTable key={o.id} order={o} />
        ))
    }
    </>

    )
}