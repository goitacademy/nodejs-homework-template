const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { authSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validateBody(authSchema), ctrl.signup);

module.exports = router;
