const express = require("express");
const validationMiddleware = require("../../middlewares/validationMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models/user");
const router = express.Router();
const users = require("../../controllers/users");

router.patch(
  "/",
  authMiddleware,
  validationMiddleware(joiSubscriptionSchema),
  users.subscriptionUpdate
);

router.post("/signup", validationMiddleware(joiRegisterSchema), users.signup);

router.post("/login", validationMiddleware(joiLoginSchema), users.login);

router.get("/current", authMiddleware, users.getCurrent);

router.get("/logout", authMiddleware, users.logout);

module.exports = router;
