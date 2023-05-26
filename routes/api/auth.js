const express = require("express");
const { auth: authCtrl } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

router.post("/register", validateBody(userSchemas.register), authCtrl.signup);

router.post("/login", validateBody(userSchemas.login), authCtrl.signin);

module.exports = router;
