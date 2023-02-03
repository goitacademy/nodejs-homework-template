const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const validation = require("../../middlewares/validation");
const { joiSchema } = require("../../models/user");

const validateMiddleware = validation(joiSchema);

router.post("/signup", validateMiddleware, ctrlWrapper(ctrl.signup));

router.post("/login", validateMiddleware, ctrlWrapper(ctrl.login));

module.exports = router;
