const express = require("express");
const router = express.Router();

const {
  singUpController,
  singInController,
  singOutController,
  currentUserController,
  subscriptionController,
} = require("../../controller/auth");

const {
  schemaPostUser,
  schemaPatchUser,
} = require("../../schema/userValidation");

const {validatorBody} = require("../../middleware/validBody");

const {authMiddleware} = require("../../middleware/auth");
const {wrapper} = require("../../helpers/tryCatch");

router.post(
  "/singup",
  validatorBody(schemaPostUser),
  wrapper(singUpController)
);

router.post("/login", validatorBody(schemaPostUser), wrapper(singInController));

router.get("/logout", authMiddleware, wrapper(singOutController));

router.get("/current", authMiddleware, wrapper(currentUserController));

router.patch(
  "/subscription",
  authMiddleware,
  validatorBody(schemaPatchUser),
  wrapper(subscriptionController)
);

module.exports = router;
