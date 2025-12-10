import env from "./dotenv.js";
import express from "express";

import cors from "cors";
import path, { dirname } from "path";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// 🟢 Load environment variables FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const configPath = path.resolve(__dirname, "config", "uat.env");
// console.log("path is ",configPath)
// dotenv.config({ path: configPath });
// 🟢 Import routes AFTER dotenv is loaded
import productRoutes from "./src/product/routes/product.routes.js";
import userRoutes from "./src/user/routes/user.routes.js";
import orderRoutes from "./src/order/routes/order.routes.js";
import cartRoutes from "./src/cart/route/cart.routes.js";
import {
  errorHandlerMiddleware,
} from "./middlewares/errorHandlerMiddleware.js";
import paymentRoutes from "./src/payment/route/payment.route.js"
import helmet from "helmet";

// 🟢 Import Passport config AFTER dotenv is loaded

const app = express();

app.use(helmet())
// 🧩 CORS Setup
const corsOption = {
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies/sessions
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOption));

// 🧩 Middleware setup
app.use(express.json());
app.use(cookieParser());


// 🧩 Session setup — required for Passport.js
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
    },
  })
);
import "./config/passport.js";
// 🧩 Passport initialization


app.use(passport.initialize());
app.use(passport.session());

// 🧩 Routes
app.use("/api/storefleet/product", productRoutes);
app.use("/api/storefleet/user", userRoutes);
app.use("/api/storefleet/cart", cartRoutes);
app.use("/api/storefleet/order", orderRoutes);
app.use("/api/storefleet/payment",paymentRoutes);


// 🧩 Error Handler Middleware
app.use(errorHandlerMiddleware);

export default app;
