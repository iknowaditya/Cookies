const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../Controllers/usersController");

// const authenticateToken = require("../Middlewares/auth");

// Protect routes with authenticateToken middleware
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

module.exports = router;
