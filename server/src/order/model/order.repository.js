import OrderModel from "./order.schema.js";
import productModel from "../../product/model/product.schema.js"

export const createNewOrderRepo = async (data) => {
  for (const item of data.orderedItems) {
    const updatedProduct = await productModel.findOneAndUpdate(
      {
        _id: item.product,
        stock: { $gte: item.quantity } 
      },
      {
        $inc: { stock: -item.quantity }
      },
      { new: true }
    );

    if (!updatedProduct) {
      return {
        success: false,
        error: {
          msg: "Product not found or insufficient stock",
          code: 409
        }
      };
    }
  }

  const newOrder = new OrderModel(data);
  await newOrder.save();

  return newOrder;
};

// checking the single order that is order by the same user
export const getSingleOrderRepo = async (id, userId) => {
  const order = await OrderModel.findOne({ _id: id, user: userId });
  return order;
}
// now user is checking its all Orders
export const getMyAllOrdersRepo = async (userId) => {
  const getAllOrder = await OrderModel.find({ user: userId });
  return getAllOrder;
};
// only admin can use this method to get all orders details 
export const getAllOrdersRepo = async () => {
  const getAllOrder = await OrderModel.find().populate("user");
  return getAllOrder;
}
// only admin can access this method to update the order status of the user 
export const updateOrderRepo = async (orderId, data) => {
  const updateOrderStatus = await OrderModel.findByIdAndUpdate(orderId,{$set : data}
    , { new: true });
  return updateOrderStatus;
}
// get all order of user seeing by admin 
export const getAllUserOrdersRepo = async (userId) => {
  const getAllOrder = await OrderModel.find({ user: userId });
  return getAllOrder;
};