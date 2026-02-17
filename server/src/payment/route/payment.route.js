import express from "express";
import { auth } from "../../../middlewares/auth.js";
import { confirmOrderPayment, createPaymentIntent } from "../controller/payment.controller.js";

const router = express.Router();


// payment intent routes

router.route("/create-payment-intent").post(auth,createPaymentIntent);
// confirm payment route of order
router.route("/order/confirm-payment").post(auth,confirmOrderPayment );



export default router;