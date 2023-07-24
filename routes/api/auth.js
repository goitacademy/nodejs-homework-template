const express = require("express");
const { validateBody } = require("../../middlewares");
const { authSchema } = require("../../models/users");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

module.exports = router;
