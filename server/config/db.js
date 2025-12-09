import mongoose from "mongoose";
import env from "../dotenv.js";

export const connectDB = async () => {
  try {
    console.log("db connecting...");
    const res = await mongoose.connect(env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connected with server`);
  } catch (error) {
    
    console.log("mongodb connection failed!");
    console.log(error);
  }
  
};
