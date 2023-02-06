const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");
const { joiSchema } = require("../../models/user");

const validateMiddleware = validation(joiSchema);

router.post("/signup", validateMiddleware, ctrlWrapper(ctrl.signup));

router.post("/login", validateMiddleware, ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
