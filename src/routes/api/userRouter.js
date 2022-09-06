const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  registrationControlls,
  loginControlls,
  logoutControlls,
  currentControlls,
} = require("../../controls/controlAuth");

const { validateAuth } = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddeleware");
const router = new express.Router();

router.post("/register", validateAuth, asyncWrapper(registrationControlls));

router.post("/login", validateAuth, asyncWrapper(loginControlls));

router.post("/logout", authMiddleware, logoutControlls);

router.post("/current", authMiddleware, asyncWrapper(currentControlls));

module.exports = router;
