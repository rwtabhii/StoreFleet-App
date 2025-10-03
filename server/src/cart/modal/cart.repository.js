import { cartModel } from "./cart.Schema.js"
import { ErrorHandler } from "../../../utils/errorHandler.js";
import ProductModel from "../../product/model/product.schema.js";

export const addProductOnCart = async (userId, productId) => {
    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    if (product.stock < 1) {
        throw new ErrorHandler("Product is out of stock", 400);
    }

    let cartItem = await cartModel.findOne({ user: userId, product: productId });

    if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
    } else {
        cartItem = new cartModel({ user: userId, product: productId });
        await cartItem.save();
    }

    return cartItem;
};
export const getCart = async (userId) => {
    try {  // Get all cart items for the user
        const allItems = await cartModel
            .find({ user: userId })
            .populate("product", "title price image"); // populate product details
        return allItems;
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
export const updateCartProduct = async (userId, cartId, type) => {
  // Find the cart item
//   console.log(userId,cartId,type)
  const cartItem = await cartModel.findOne({ _id:cartId ,user: userId, });
//   console.log("cartitem", cartItem);

  if (!cartItem) {
    throw new ErrorHandler("Cart item not found", 404);
  }

  // Update quantity based on the type
  if (type === "increment") {
    cartItem.quantity += 1;
  } else if (type === "decrement") {
    // Decrease quantity but ensure it doesn't go below 1
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      throw new ErrorHandler("Quantity cannot be less than 1", 400);
    }
  } else {
    throw new ErrorHandler("Invalid update type", 400);
  }

  await cartItem.save();
  return cartItem;
};
export const deleteCartProduct = async (userId, cartId) => {
    const deletedItem = await cartModel.findOneAndDelete({ _id: cartId,user: userId});

    if (!deletedItem) {
        throw new ErrorHandler("Cart item not found", 404);
    }

    return deletedItem;
};

export const clearCart = async (userId) => {
  const result = await cartModel.deleteMany({ user: userId });
  return result.deletedCount; // number of deleted items
};