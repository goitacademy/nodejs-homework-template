const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  subscriptionUser,
} = require("../../controllers/auth");
const validateBody = require("../../utils/validateBody");
const { schemas } = require("../../models/user");
const { authenticate } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.registerUserSchema),
  registerUser
);
router.post("/login", validateBody(schemas.loginUserSchema), loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/current", authenticate, currentUser);
router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionUserSchema),
  subscriptionUser
);
module.exports = router;
