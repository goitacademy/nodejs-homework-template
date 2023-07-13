const express = require("express");

const { controllerWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");
const { schemas } = require("../../models/user");

const usersController = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(usersController.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(usersController.login)
);

router.get("/current", auth, controllerWrapper(usersController.getCurrent));

router.post("/logout", auth, controllerWrapper(usersController.logout));

router.patch(
  "/subscription",
  auth,
  validateBody(schemas.subscriptionSchema),
  controllerWrapper(usersController.updateSubscription)
);

module.exports = router;
