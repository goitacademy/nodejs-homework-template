const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBy, authenticate } = require("../../middlewars");

router.post("/register", validateBy(schemas.register), controller.register);

router.post("/login", validateBy(schemas.lodIn), controller.logIn);

router.get("/current", authenticate, controller.getCurrent);

router.post("/logout", authenticate, controller.logOut);

router.patch(
  "/",
  authenticate,
  validateBy(schemas.subscriptionUpdate),
  controller.subscriptionUpdate
);

module.exports = router;
