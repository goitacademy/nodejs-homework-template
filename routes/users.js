const express = require("express");

const usersCtrl = require("../controllers/users");
const { validateBody, auth, upload } = require("../middlewares");
const { schemas } = require("../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  usersCtrl.register
);

router.post("/login", validateBody(schemas.loginSchema), usersCtrl.login);

router.post("/logout", auth, usersCtrl.logout);

router.get("/current", auth, usersCtrl.getCurrent);

router.patch("/avatars", auth, upload.single("avatar"), usersCtrl.updateAvatar);

router.patch(
  "/",
  auth,
  validateBody(schemas.updateSubscriptionSchema),
  usersCtrl.updateSubscriptionType
);

module.exports = router;
