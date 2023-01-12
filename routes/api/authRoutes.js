const express = require("express");
const { schemas } = require("../../db/UserModel");
const ctrl = require("../../controllers/authController");
const { upload } = require("../../middlewares/upload");
const { validateBody, authenticate } = require("../../middlewares");

// const {
//   registrationController,
//   loginController,
// } = require("../../controllers/authController");
// const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();
// router.post("/registration", asyncWrapper(registrationController));
// router.post("/login", asyncWrapper(loginController));

// signup
router.post(
  "/signup",
  upload.single("avatar"),
  validateBody(schemas.registerSchema),
  ctrl.register
);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionUpdateSchema),
  ctrl.subscriptionUpdate
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.avatarUpdate
);
module.exports = router;
