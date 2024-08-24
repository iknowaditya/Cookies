const express = require("express");
const User = require("../Models/authUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Validation Middleware..
const validateRegister = [
  body("user", "Name is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("pwd", "Please enter a password with 6 or more characters").isLength({
    min: 6,
  }),
];

// Middleware for verifying user / checks if the user exists.
async function verifyUser(req, res, next) {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Register a new user..
const handleRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, email, pwd } = req.body;

  try {
    // Check if user exists..
    let users = await User.findOne({ email });
    if (users) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password..
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(pwd, salt);

    // Create a new User..
    users = new User({
      name: user,
      email: email,
      password: hashPassword,
    });
    console.log(users.name);
    await users.save();

    // Generate JWT token..
    const payload = { userId: users._id };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: { id: users._id, name: users.name, email: users.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login a user..
const handleLogin = async (req, res) => {
  try {
    const { email, pwd } = req.body;

    // Validate input
    if (!email || !pwd) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(pwd, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Generate JWT access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    // Generate JWT refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save the refresh token with the current user
    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);

    // Create secure cookie with the refresh token

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send the access token to the client..

    res.status(200).json({
      message: "Login Successful",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to authenticate the token..
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  console.log({ token });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Log out user..
const handleLogout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleLogin,
  verifyUser,
  handleRegister,
  validateRegister,
  handleLogout,
  authenticateToken,
};
