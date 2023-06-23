const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { validateBody } = require("../../middleware");

const { schemas } = require("../../models/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
