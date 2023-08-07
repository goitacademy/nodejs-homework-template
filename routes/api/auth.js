const express = require("express");
const { sсhemas } = require("../../models/user");
const validateBody = require("../../middlewares/isValidateBody");
const router = express.Router();
const ctrl = require("../../controllers/auth");

// signup
router.post("/register", validateBody(sсhemas.registerShema), ctrl.register);
router.post("/login", validateBody(sсhemas.loginShema), ctrl.login);

module.exports = router;
