const express = require("express");

const { userValidationSchemas } = require("../../utils/validation");
const { validateBody } = require("../../utils");
const ctrl = require("../../controllers/users.controllers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(userValidationSchemas.addSchema),
  ctrl.register
);

router.post(
  "/login",
  validateBody(userValidationSchemas.addSchema),
  ctrl.login
);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
