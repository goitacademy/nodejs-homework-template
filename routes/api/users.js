const express = require("express");
const router = express.Router();
const  register = require("../../controllers/users/users");
const { validateBody, isValidId } = require("../../middleware");
const { ctrlWrapper } = require("../../helpers");
const { registerSchema } = ("../../models/user.js");
const { loginSchema } = ("../../models/user.js");
const { schemas} = ("../../models/user.js")


router.post(
  "/register",
  validateBody(registerSchema),
  register
);




module.exports = router;