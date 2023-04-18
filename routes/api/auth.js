const express = require("express");
const controllers = require("../../controllers/authControllers");
const authenticate = require("../../middlewares/authenticate");
const {
  validationRegister,
  validationLogin,
} = require("../../middlewares/validate");

const router = express.Router();

router.post("/register", validationRegister, controllers.registerUser);

router.post("/login", validationLogin, controllers.loginUser);

router.get("/current", authenticate, controllers.getCurrent);

router.post("/logout", authenticate, controllers.getLogout);

module.exports = router;
