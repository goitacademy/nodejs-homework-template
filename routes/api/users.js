const express = require("express");

const controller = require("../../controllers/users");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// main rout -> http://localhost:3000/api/users

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  controllerWrapper(controller.updateSubscribe),
);

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateAvatar),
);

module.exports = router;
