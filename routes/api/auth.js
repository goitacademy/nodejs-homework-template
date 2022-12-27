const express = require("express");

const router = express.Router();

const auth = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { controllerWrapper } = require("../../helpers");

const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../../schemas");

router.post(
  "/register",
  validateBody(registerUserSchema),
  controllerWrapper(auth.registerUser)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  controllerWrapper(auth.logInUser)
);

router.post("/logout", authenticate, controllerWrapper(auth.logOutUser));

router.get("/current", authenticate, controllerWrapper(auth.currentUser));

router.post(
  "/updatePassword/:userId",
  authenticate,
  validateBody(updateUserSchema),
  controllerWrapper(auth.updateUserPassword)
);

router.get(
  "/verify/:verificationToken",
  controllerWrapper(auth.verifyUserViaEmail)
);

module.exports = router;
