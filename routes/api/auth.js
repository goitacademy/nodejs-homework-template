const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/users");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
