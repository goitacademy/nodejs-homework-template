const express = require("express");
const router = express.Router();

const {
  validateBody,
  authenticate,
  validateSubscription,
} = require("../middlewares");
const {
  userSchema,
  subscriptionUserValidationSchema,
} = require("../utils/schemas");
const {
  createUser,
  login,
  logout,
  getCurrentUser,
  changeTypeSubscription,
} = require("../controllers/usersControllers");

router.route("/register").post(validateBody(userSchema), createUser);
router.route("/login").post(validateBody(userSchema), login);
router.route("/logout").post(authenticate, logout);
router.route("/current").get(authenticate, getCurrentUser);
router
  .route("/")
  .patch(
    authenticate,
    validateSubscription(subscriptionUserValidationSchema),
    changeTypeSubscription
  );

module.exports = { usersRouter: router };
