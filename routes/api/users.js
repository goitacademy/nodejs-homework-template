const express = require("express");
const userCtrl = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscribtion),
  userCtrl.updateSubscribtion
);

router.patch("/users/avatars", authenticate, upload, userCtrl.updateAvatar);

module.exports = router;
