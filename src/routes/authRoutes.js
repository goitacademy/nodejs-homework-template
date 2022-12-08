const express = require("express");
const {
  registrationController,
  loginController,
} = require("../controllers/authControllers");

const { asyncWrapper } = require("../helpers/apiHelpers");

const router = express.Router();

router.post("/registration", asyncWrapper(registrationController));

router.post("/login", asyncWrapper(loginController));

module.exports = router;
