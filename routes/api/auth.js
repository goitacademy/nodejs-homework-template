const express = require("express");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const CtrlWrapper = require("../../helpers/ctrlWrapper");
const { schemas } = require("../../models/userAuth");
const authentificate = require("../../middlewares/authentificate");
const ctrl = require("../../controllers");
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  CtrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  CtrlWrapper(ctrl.login)
);

router.get("/current", authentificate, CtrlWrapper(ctrl.getCurrent));

module.exports = router;
