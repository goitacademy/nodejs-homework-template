const express = require("express");

const controllers = require("../../controllers/users");
const { controllerWrapper } = require("../../helpers");
const schema = require("../../schemas");

const { authorize, upload, validateBody } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schema.userRegisterSchema),
  controllerWrapper(controllers.registerUser)
);

router.post(
  "/login",
  validateBody(schema.userLoginSchema),
  controllerWrapper(controllers.loginUser)
);

router.get("/logout", authorize, controllerWrapper(controllers.logoutUser));

router.get(
  "/current",
  authorize,
  controllerWrapper(controllers.getCurrentUser)
);

router.patch(
  "/subscription",
  authorize,
  validateBody(schema.subscriptionSchema),
  controllerWrapper(controllers.updateSubscription)
);

router.patch(
  "/avatars",
  authorize,
  upload.single("avatar"),
  controllerWrapper(controllers.avatarUser)
);

module.exports = router;
