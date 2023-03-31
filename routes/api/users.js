const express = require('express');



const router = express.Router();
const {users: ctrl} = require('../../controllers')
const {validation} = require("../../middlewares/validation");
const {joiSchema} = require("../../models/users");
const auth = require('../../middlewares/auth');


router.post('/register', validation(joiSchema),ctrl.register);
router.post('/login',  validation(joiSchema),ctrl.login);
router.post('/logout', auth, validation(joiSchema), ctrl.logout);

module.exports = router;