const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

//  signup

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
