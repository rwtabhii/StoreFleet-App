import Stripe from "stripe";
import { cartModel } from "../../cart/modal/cart.Schema.js";
import mongoose from "mongoose";
import env from "../../../dotenv.js";
import ProductModel from "../../product/model/product.schema.js";
import OrderModel from "../../order/model/order.schema.js";


const stripe = new Stripe(env.STRIPE_SECRET_KEY);

// ---------- CALCULATE TOTAL ---------

const calculateCartTotal = async (userId) => {
  const result = await cartModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId)
      }
    },

    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productData"
      }
    },

    { $unwind: "$productData" },

    {
      $addFields: {
        itemTotal: {
          $multiply: ["$quantity", "$productData.price"]
        }
      }
    },

    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$itemTotal" }
      }
    }
  ]);

  return result[0]?.totalAmount || 0;
};

export default calculateCartTotal;

// ---------- CREATE PAYMENT INTENT ----------
export const createPaymentIntent = async (req, res, next) => {
  try {
    // console.log(req.body)
    const userId = req.user._id // From auth middleware
    // console.log(userId)

    // secure: user cannot change amount
    const totalAmount = await calculateCartTotal(userId);
    // console.log(totalAmount)

    if (totalAmount <= 0) {
      return res.status(400).json({ success: false, msg: "Cart is empty" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { userId },
    });

    return res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret, });

  } catch (err) {
    // console.log(err);
    res.status(500).json({ success: false, msg: "Payment error" });
  }
};


export const confirmOrderPayment = async (req, res, next) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    console.log(req.body)
    // 1️⃣ Get order
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // 2️⃣ Verify payment with Stripe (SERVER TRUST ONLY)
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed"
      });
    }

    // 3️⃣ Reduce stock ATOMICALLY
    for (const item of order.orderedItems) {
      const updatedProduct = await ProductModel.findOneAndUpdate(
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
        return res.status(409).json({
          success: false,
          message: "Stock issue while confirming order"
        });
      }
    }

    // 4️⃣ Update order
    order.paymentInfo = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      type: paymentIntent.payment_method_types[0] || "card"
    };

    order.orderStatus = "CONFIRMED";
    order.paidAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified & order confirmed",
      order
    });

  } catch (err) {
    next(err);
  }
};