const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../../middlewares");
const middlewares = require("../../middlewares");
const authController = require("../../controlers/authController");
const { loginSchemaValidation } = require("../../Shema");
console.log(typeof authController.signup);

router.post(
  "/signup",
  middlewares.authMiddleware.checkSing,
  authController.signup
);
router.post(
  "/login",
  authController.login,
  authMiddleware.checkLogin,
  authController.login
);
// password restore

// password send instruction in mail , restore password
// router.post("/forgot-password");
// password update
// router.post("/restore-password");

//================================================================
module.exports = router;
