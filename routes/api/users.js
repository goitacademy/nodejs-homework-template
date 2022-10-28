const express = require("express");

const controller = require("../../controllers/users");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  controllerWrapper(controller.updateSubscribe),
);

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

module.exports = router;
