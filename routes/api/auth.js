const express = require("express");

const ctrl = require("../../controllers/auth/index")

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

module.exports = router;