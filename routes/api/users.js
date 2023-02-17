const express = require("express");
const { usersControllers } = require("../../controllers");
const { auth, usersValidation } = require("../../middlewares/users");
const {
  authUserJoiSchema,
  loginUserJoiSchema,
  changeSubscriptionUserJoiSchema,
} = require("../../models/users");

const router = express.Router();

const validationUserAuth =
  usersValidation.userAuthValidation(authUserJoiSchema);

const validationUserLogin =
  usersValidation.userAuthValidation(loginUserJoiSchema);

const validationChangeSubscriptionUser = usersValidation.userAuthValidation(
  changeSubscriptionUserJoiSchema
);

router.post("/register", validationUserAuth, usersControllers.register);
router.post("/login", validationUserLogin, usersControllers.login);
router.get("/current", auth, usersControllers.getCurrent);
router.post("/logout", auth, usersControllers.logout);
router.patch(
  "/",
  auth,
  validationChangeSubscriptionUser,
  usersControllers.changeSubscription
);

module.exports = router;
