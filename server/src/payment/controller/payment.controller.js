import Stripe from "stripe";
import { cartModel } from "../../cart/modal/cart.Schema.js";
import mongoose from "mongoose";
import env from "../../../dotenv.js";

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
