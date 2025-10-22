// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
import jwt from "jsonwebtoken";
import {
  createNewUser,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUserDetails,
  getUserDetailsForAdmin,
  logoutUser,
  resetUserPassword,
  updatePassword,
  updateUserProfile,
  updateUserProfileAndRole,
  userLogin,
} from "../controller/user.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";
import passport from "passport";
import env from "../../../dotenv.js";

const router = express.Router();

// User POST Routes 
router.route("/signup").post(createNewUser);
router.route("/login").post(userLogin);
router.route("/password/forget").post(forgetPassword);

// User PUT Routes 
router.route("/password/reset/:token").put(resetUserPassword);
router.route("/password/update").put(auth, updatePassword);
router.route("/profile/update").put(auth, updateUserProfile);

// User GET Routes 
router.route("/details").get(auth, getUserDetails);
router.route("/logout").get(auth, logoutUser);

// OAUTH implement
// 1. user go to google login 
router.route("/auth/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));
// 2. google redirect back
router.route("/auth/google/callback").get(
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  async (req, res) => {
    try {
      // 1️⃣ Get the logged-in user from Passport
      const user = req.user;
      // console.log(user)

      // 2️⃣ Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRE || "7d" } // e.g. "7d"
      );

      // 3️⃣ Save token to DB (optional but recommended)
      user.token = token; // assuming you have a token field in schema
      await user.save({ validateBeforeSave: false });

      // 4️⃣ Set cookie options
      const cookieOptions = {
        expires: new Date(
          Date.now() + env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      };

      // 5️⃣ Set token in cookie
      res.cookie("token", token, cookieOptions);

      // 6️⃣ Redirect to frontend (home page)
      res.redirect("http://localhost:5173/");
    } catch (error) {
      console.error("Error in Google callback:", error);
      res.redirect("http://localhost:5173/login");
    }
  }
);

// after OAuth take user detail
router.route("/me").get(auth, async (req, res) => {
  try {
    console.log(req.user,"after auth");
    res.status(200).json({ success: true, user: req.user });
  } catch (err) {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

// Admin GET Routes
router.route("/admin/allusers").get(auth, authByUserRole("admin"), getAllUsers);
router
  .route("/admin/details/:id")
  .get(auth, authByUserRole("admin"), getUserDetailsForAdmin);

// Admin DELETE Routes
router.route("/admin/delete/:id")
  .delete(auth, authByUserRole("admin"), deleteUser);

// Admin PUT Routes 
// Implement route for updating role of other users 
// Write your code here 
router.route("/admin/update/:id")
  .put(auth, authByUserRole("admin"), updateUserProfileAndRole);
export default router;
