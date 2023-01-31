const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { registration, login } = require("../../controllers/users");
const { validate } = require("../../middlewares/validateBody");
const { loginSchema, registerSchema } = require("../../models/user");

router.post("/register", validate(registerSchema), ctrlWrapper(registration));
router.post("/login", validate(loginSchema), ctrlWrapper(login));

module.exports = router;
