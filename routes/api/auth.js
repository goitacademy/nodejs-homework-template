const exspress = require("express");

const controller = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = exspress.Router();

router.post(
  "/signup",
  validateBody(schemas.registerSchema),
  controllerWrapper(controller.register)
);

router.get(
  "/verify/:verificationToken",
  controllerWrapper(controller.verifyEmail)
);
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  controllerWrapper(controller.resendVerifyEmail)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(controller.login)
);

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

router.post("/logout", authenticate, controllerWrapper(controller.logout));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),

  controllerWrapper(controller.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateAvatar)
);

module.exports = router;