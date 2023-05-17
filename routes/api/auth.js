const express = require("express");

const router = express.Router();

const {
  registration,
  login,
  logout,
  currentUser,
  subscription,
  updateAvatar,
} = require("../../controlles/auth");
const ctrl = require("../../controlles/auth");
const { validateBody, auth, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  registration
);
router.post("/users/login", validateBody(schemas.loginSchema), login);

router.post("/users/logout", auth, logout);

router.get("/users/current", auth, currentUser);

router.patch("/users", auth, subscription);

router.patch("/users/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
