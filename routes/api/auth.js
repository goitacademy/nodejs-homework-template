const express = require("express");

const { schemas } = require("../../models/auth");

const ctrl = require("../../controllers/users");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerschema), ctrl.register);

module.export = router;
