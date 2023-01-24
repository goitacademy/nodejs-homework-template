const express = require("express");
const auth = require("../../middlewares/auth");
const router = express.Router();

const { userController } = require("../../controllers");
const {
  usersSignUnValidation,
  usersLogInValidation,
} = require("../../middlewares/userValidationMiddleware");

router.post("/signup", usersSignUnValidation, userController.signUp);

router.post("/login", usersLogInValidation, userController.logIn);

router.get("/logout", auth, userController.logOut);

router.get("/current", auth, userController.current);

module.exports = router;
