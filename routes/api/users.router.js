const express = require("express");

const ctrl = require("../../controllers/user.controllers");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/users");


const router = express.Router();

router.post("/register", validateBody(schemas.loginSchema), ctrl.register);

module.exports = router;
