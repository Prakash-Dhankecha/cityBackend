import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import busRoute from "./routes/bus.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/booking.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin:true,
  credentials:true,
}

// database connection
mongoose.set("strictQuery", false);
const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB error: " + error);
  }
};

// testing
app.get("/", (req, res) => {
  res.send("api is working");
});

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/bus", busRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// routes

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
