const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const jsonParser = express.json();
const upload = require("../middleware/upload");
const AuthController = require("../controllers/authController");
const validateBody = require("../middleware/validateBody");
const { schemas } = require("../models/user");

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.RegisterSchema),
  AuthController.register
);
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.LoginSchema),
  AuthController.login
);
router.post("/logout", auth, AuthController.logout);
router.get("/current", auth, AuthController.current);
router.patch(
  "/avatar",
  // auth,
  upload.single("avatar"),
  AuthController.uploadAvatar
);

module.exports = router;
