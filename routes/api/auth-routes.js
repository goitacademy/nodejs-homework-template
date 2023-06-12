const express = require('express');

const authController = require("../../controllers/auth");

const schemas = require("../../schemas/users");

const { validateBody }  = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.userRegisterSchema, authController.register))

module.exports = router;
