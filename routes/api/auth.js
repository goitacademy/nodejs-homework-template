const express = require("express");
const router = express.Router();

const Validate = require("../../middlewares/ValidateBodyAddContact");
const {
  validateUserSchemaRegister,
  validateUserSchemaLogin,
  validateUpdateSubscription,
  validateUploadAvatar,
} = require("../../schemas/ValidateAuth");
const ctrl = require("../../controllers/usersCtrl");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

router.post(
  "/register",
  Validate(validateUserSchemaRegister),
  ctrl.registerUser
);

router.post("/login", Validate(validateUserSchemaLogin), ctrl.loginUser);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarUrl"),
  Validate(validateUploadAvatar),
  ctrl.uploadUserAvatar
);

router.patch(
  "/:userId",
  authenticate,
  Validate(validateUpdateSubscription),
  ctrl.updateUserSubscription
);


module.exports = router;
