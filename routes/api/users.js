const express = require('express');



const router = express.Router();
const {users: ctrl} = require('../../controllers')
const {validation} = require("../../middlewares/validation");
const {joiSchema} = require("../../models/users");


router.post('/register', validation(joiSchema),ctrl.register);

module.exports = router;