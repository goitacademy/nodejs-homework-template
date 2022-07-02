const express = require("express");
const router = express.Router();

const controllerWrapper = require("../../middlewares/controllerWrapper");
const userValidation = require("../../middlewares/validation");
const userIsAuth = require("../../middlewares/userIsAuth");
const upload = require("../../middlewares/upload")

const {
  joiUserRegisterSchema,
  joiUserLoginSchema,
  joiUserSubscriptionUpdateSchema,
} = require("../../models/users");
const userController = require("../../controllers/userLogin/userController");

router.post(
  "/signup",
  userValidation(joiUserRegisterSchema),
  controllerWrapper(userController.register)
);

router.post(
  "/login",
  userValidation(joiUserLoginSchema),
  controllerWrapper(userController.login)
);

router.post("/logout", userIsAuth, controllerWrapper(userController.logout));

router.get(
  "/current",
  userIsAuth,
  controllerWrapper(userController.getCurrentUser)
);

router.patch(
  "/",
  userIsAuth,
  userValidation(joiUserSubscriptionUpdateSchema),
  controllerWrapper(userController.updateSubscription)
);
router.patch(
  "/avatars",
  userIsAuth,
  upload.single('avatar'),
  // userValidation(joiUserSubscriptionUpdateSchema),
  controllerWrapper(userController.updateAvatar)
);

module.exports = router;
