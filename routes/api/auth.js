const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  getCurrent,
  logOutController,
  subscriptionConroller,
} = require("../../controller/auth");
const { auth } = require("../../middlewares/auth");
const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");

const {
  joiSchema,
  joiSchemaSubscription,
} = require("../../service/shemas/user");
const {
  validationRegister,
  validationSubsribtion,
} = require("../../service/validations/validations");
router.post(
  "/signup",
  validationRegister(joiSchema),
  ctrlWrapper(registerController)
);
router.post(
  "/login",
  validationRegister(joiSchema),
  ctrlWrapper(loginController)
);
router.get("/logout", auth, ctrlWrapper(logOutController));
router.get("/current", auth, ctrlWrapper(getCurrent));

router.patch(
  "",
  auth,
  validationSubsribtion(joiSchemaSubscription),
  ctrlWrapper(subscriptionConroller)
);

module.exports = router;
