const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas");

router.post(
  "/register",
  validateBody(schemas.registerAndLoginSchema),
  ctrl.register
);
router.post("/login", validateBody(schemas.registerAndLoginSchema), ctrl.login);

module.exports = router;
