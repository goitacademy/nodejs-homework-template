const express = require("express");
const {
  validationConstructor,
  controllerWrapper,
  isValidId,
  isAuth,
} = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", isAuth, controllerWrapper(users.getCurrent));

module.exports = router;
