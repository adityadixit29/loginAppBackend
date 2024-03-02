import express from "express";
import userRouter from "./routes/user.js"
export const app = express();
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

config()
//middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTED_URL);

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.FRONTED_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
//routes
app.use("/api/v1/users", userRouter)


//using error middleware
app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send("running")
})

