const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./Config/db.js");
const userRoute = require("./Routes/authUser.js");
const getUserRoute = require("./Routes/users.js");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(
  cors({
    //origin: "http://localhost:5173",
    origin: "https://user-login-jwt-auth-frontend.vercel.app",
    credentials: true,
  })
);

// Connection to DB..
connectMongoDB(process.env.MONGO_KEY)
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
    process.exit(1);
  });

// Middleware - plugin..
app.use(express.json()); // allow us to parse incomming request: req.body.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes..
app.use("/api", userRoute);
app.use("/v1", getUserRoute);
app.use("/", (req, res) => {
  res.send("Server is running...");
});

// Listen to the server..
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
