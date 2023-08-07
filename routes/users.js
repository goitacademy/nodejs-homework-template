const express = require("express");
const {
  logout,
  login,
  register,
  current,
  updateAvatar,
} = require("../controllers/auth.contoller");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const { validateRegister, validateLogin } = require("../models/validateContacts");
const { schemas } = require("../models/user");
const upload = require("../middleware/upload");

router.post("/register", validateRegister(schemas.registerSchema), register);
router.post("/login", validateLogin(schemas.loginSchema), login); 
router.post("/logout", authMiddleware, logout);
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);
router.get("/current", authMiddleware, current);

module.exports = router;
