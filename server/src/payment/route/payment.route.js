import express from "express";
import { auth } from "../../../middlewares/auth.js";
import { createPaymentIntent } from "../controller/payment.controller.js";

const router = express.Router();


// payment intent routes

router.route("/create-payment-intent").post(auth,createPaymentIntent);



export default router;