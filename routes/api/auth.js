const express = require('express');

const { auth, validation, control } = require('../../middlewares/');
const { auth: ctrl } = require('../../controllers/');
const { joiLoginSchema, joiRegisterSchema } = require('../../models/user');
const router = express.Router();

router.post('/signup', validation(joiRegisterSchema), control(ctrl.signup));
router.post('/login', validation(joiLoginSchema), control(ctrl.login));
router.get('/logout', auth, control(ctrl.logout));
module.exports = router;
