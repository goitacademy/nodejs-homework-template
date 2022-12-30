const express = require('express');

const {auth: ctrl} = require('../../controllers/index');
const {userJoiSchema} = require('../../models/userModel');
const {validation, ctrlWrapper, auth} = require('../../middlewares');
const router = new express.Router();
require("dotenv").config();

router.post('/signup', validation(userJoiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(userJoiSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));



module.exports = {authRouter: router};