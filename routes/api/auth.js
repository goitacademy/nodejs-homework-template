const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

/* sign up */
router.post(
  "/signup",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/verify",
  validateBody(schemas.emaelSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

/* sign in */
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get(" /verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
