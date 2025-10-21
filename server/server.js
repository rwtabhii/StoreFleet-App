import server from "./app.js";
import { connectDB } from "./config/db.js";
import env from "./dotenv.js";


const serverStar = server.listen(env.PORT, async (err) => {
  if (err) {
    console.log(`server failed with error ${err}`);
  } else {
    await connectDB();
    console.log(`server is running`);
  }
});
