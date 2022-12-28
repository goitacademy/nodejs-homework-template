const express = require("express");
const {
  loginController,
  logoutController,
  registerController,
  currentUserController,
  userStatusController,
} = require("../../controllers/auth");

const { userToken } = require("../../middleware/userToken");
const {
  registerUserValid,
  loginUserValid,
} = require("../../middleware/schemas/validationUser");
const { validation } = require("./middleware/validationBody");

const router = express.Router();

router.get("/current", userToken, currentUserController);
router.patch("/", userToken, userStatusController);
router.post("/register", validation(registerUserValid), registerController);
router.get("/login", validation(loginUserValid), loginController);
router.post("/logout", userToken, logoutController);

module.exports = router;
