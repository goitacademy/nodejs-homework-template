const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  register,
  login,
  logout,
  currentUser,
} = require("../../controllers/authController");
const { addUserValidation } = require("../../middlewares/validationMiddleware");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", addUserValidation, asyncWrapper(register));
router.post("/login", addUserValidation, asyncWrapper(login));
router.post("/logout", asyncWrapper(auth), asyncWrapper(logout));
router.get("/current", asyncWrapper(auth), asyncWrapper(currentUser));

module.exports = router;
