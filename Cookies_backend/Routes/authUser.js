const express = require("express");
const {
  handleLogin,
  verifyUser,
  handleRegister,
  validateRegister,
  handleLogout,
} = require("../Controllers/authUser");

const router = express.Router();

router.post("/login", verifyUser, handleLogin);
router.post("/register", validateRegister, handleRegister);
router.post("/logout", handleLogout);

module.exports = router;
