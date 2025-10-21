// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
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
router.route(
  "/auth/google/callback").get(
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
    (req, res) => {
      // Create your own JWT token for this logged-in user
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.JWT_Secret,
        { expiresIn: process.env.JWT_Expire }
      );

      // Redirect to frontend with the token
      res.redirect(`http://localhost:5173`);
    }
  );

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
