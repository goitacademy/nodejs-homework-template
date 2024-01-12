const express = require("express");
const { authControllers } = require("../../controllers");
const {
  checkRegistrationData,
  checkLoginData,
  protect,
  userupdateava,
} = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", checkRegistrationData, authControllers.signup);

router.post("/login", checkLoginData, authControllers.login);

router.use(protect);

router.patch("/avatars", userupdateava, authControllers.avatars);

router.post("/logout", authControllers.logout);

router.get("/current", authControllers.getCurrent);

module.exports = router;
