const express = require('express');

const ctrl = require("../../controllers/auth");

const schemas = require("../../schemas/user");

const { validateBody }  = require("../../middlewares");

const router = express.Router();

router.post('/register', validateBody(schemas.userRegisterSchema), ctrl.register);

module.exports = router;
