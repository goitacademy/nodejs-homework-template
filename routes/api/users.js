const express = require("express");

const {
  register,
  login,
  logout,
  getCurrent,
  changeSubscription,
} = require("../../controllers/users");

const { validateBody } = require("../../middlewares/validateBody");
const isValidToken = require("../../middlewares/isValidToken");

const { schema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schema.authSchema), register);

router.post("/login", validateBody(schema.authSchema), login);

router.post("/logout", isValidToken, logout);

router.get("/current", isValidToken, getCurrent);

router.patch(
  "/",
  isValidToken,
  validateBody(schema.subscriptionSchema),
  changeSubscription
);

module.exports = router;
