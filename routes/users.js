const express = require("express");
const {
  logout,
  login,
  register,
  current,
} = require("../controllers/auth.contoller");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const { validateRegister } = require("../models/validateContacts");
const { schemas } = require("../models/user");

router.post("/register", validateRegister(schemas.registerSchema), register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, current);

module.exports = router;
