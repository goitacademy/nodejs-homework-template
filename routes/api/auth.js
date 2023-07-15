const express = require('express');

const ctrl = require("../../controllers/auth");

const {validateBody} = require("../../middlewares");
const {userSchemas} = require("../../models/user");

const router = express.Router();

router.post('./register', validateBody(userSchemas.registerSchema), ctrl.register);

module.exports = router;