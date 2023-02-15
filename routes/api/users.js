const express = require("express");
const { usersControllers } = require("../../controllers");
const { usersValidation } = require("../../middlewares/users");
const { authUserJoiSchema } = require("../../models/users");

const router = express.Router();

const validationUserAuth =
  usersValidation.userAuthValidation(authUserJoiSchema);

router.post("/register", validationUserAuth, usersControllers.register);

module.exports = router;
