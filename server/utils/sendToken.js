// create token and save into cookie
import env from "../dotenv.js";
export const sendToken = async (user, res, statusCode) => {
   const isProduction = process.env.NODE_ENV === "production";
  const token = user.getJWTToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: isProduction,                  // true only in production
    sameSite: isProduction ? "None" : "Lax",  // None for prod, Lax for local

  };
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({ success: true, user, token });
};
