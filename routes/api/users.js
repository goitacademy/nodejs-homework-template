const express = require("express");
const { usersControllers } = require("../../controllers");
const { auth, usersValidation } = require("../../middlewares/users");
const { authUserJoiSchema, loginUserJoiSchema } = require("../../models/users");

const router = express.Router();

const validationUserAuth =
  usersValidation.userAuthValidation(authUserJoiSchema);

const validationUserLogin =
  usersValidation.userAuthValidation(loginUserJoiSchema);

router.post("/register", validationUserAuth, usersControllers.register);
router.post("/login", validationUserLogin, usersControllers.login);
router.get("/current", auth, usersControllers.getCurrent);

module.exports = router;
