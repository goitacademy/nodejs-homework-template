const express = require("express");

const AuthCtrl = require("../../controller/auth");
const authMiddleware = require("../../middleware/auth");
const validBody = require("../../middleware/validBody");
const schemas = require("../../service/schemas/user");

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validBody(schemas.registerSchema),
  AuthCtrl.register
);

router.post(
  "/login",
  jsonParser,
  validBody(schemas.loginSchema),
  AuthCtrl.login
);
router.get("/current", authMiddleware, AuthCtrl.checkCurrent);
router.get("/logout", authMiddleware, AuthCtrl.logout);

module.exports = router;
