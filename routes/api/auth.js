const express = require('express');
const { authMiddleware, validation, ctrlWrapper } = require('../../middlewares/index');
const { registerJoiSchema, loginJoiSchema} = require('../../models/users');
const ctrl = require("../../controllers/authCtrl");

const router = express.Router();

router.post('/register', validation(registerJoiSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(loginJoiSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authMiddleware, ctrlWrapper(ctrl.logout));


module.exports = router;