const express = require("express");
const { validateBody, authenticate, isValidId } = require("../../middlewares");
const {
  UserModel: { schemasUser },
} = require("../../models");
const { ctrlUsers } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  ctrlUsers.register);

router.post("/login", validateBody(schemasUser.loginSchema), ctrlUsers.login) 

router.post("/logout", authenticate, ctrlUsers.logout); 

router.get("/current", authenticate, ctrlUsers.getCurrent); 

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(schemasUser.updateSubscriptionSchema),
  ctrlUsers.updateSubscriptionUser
);

module.exports = router;
