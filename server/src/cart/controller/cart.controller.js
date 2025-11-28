import { errorHandlerMiddleware } from "../../../middlewares/errorHandlerMiddleware.js";
import { addProductOnCart, getCart, updateCartProduct, deleteCartProduct } from "../modal/cart.repository.js";
import { clearCart } from "../modal/cart.repository.js";

export const addToCart = async (req, res, next) => {
    try {
        // console.log(req.body)
        const { productId } = req.body;
        const userId = req.user._id;

        await addProductOnCart(userId, productId);

        res.status(201).json({
            success: true,
            message: "Product added to cart successfully"
        });
    } catch (err) {
        // Pass the ErrorHandler instance to your global middleware
        next(err);
    }
};

export const getUserCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cartDetail = await getCart(userId);
        console.log(cartDetail)
        return res.status(200).json({
            success: true,
            allItems: cartDetail
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
export const placeUserOrder = async(req,res,next)=>{

}
export const updateUserCart = async (req, res, next) => {
    try {
        // console.log(req.params)
        const { cartId } = req.params;
        const { type } = req.body;
        const userId = req.user._id;

        const updatedCart = await updateCartProduct(userId, cartId, type);

        res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            cartItem: updatedCart
        });
    } catch (err) {
        next(err);
    }
};
export const deleteUserCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { cartId } = req.params;

        await deleteCartProduct(userId, cartId);

        return res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });
    } catch (err) {
        next(err); // Passes the error to global error handler
    }
};

export const clearUserCart = async (req, res, next) => {
  try {
    console.log(req.user._id)
    const userId = req.user._id;

    const deletedCount = await clearCart(userId);
    console.log(deletedCount);

    if (deletedCount === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is already empty",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (err) {
    console.log(err);
    next(err); // Pass to error handler
  }
};