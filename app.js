const express = require("express");

require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

//security
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectDB = require("./db/connect");

//router import
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes");
const absenteesRouter = require("./routes/absenteesRoutes");
const paymentRouter = require("./routes/paymentRoutes");

//err middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
// app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).send("Ecommerce API");
});
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.status(200).send("Ecommerce API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/absentees", absenteesRouter);
app.use("/api/v1/payments", paymentRouter);

//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
