import express from "express";
import { addToCart,getUserCart,updateUserCart,deleteUserCart } from "../controller/cart.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/add").post(auth,addToCart)
router.route("/").get(auth,getUserCart);
router.route("/:cartId").put(auth,updateUserCart);
router.route("/:cartId").delete(auth,deleteUserCart);


export default router