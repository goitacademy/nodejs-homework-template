const express = require('express');
const router = new express.Router();
const { userValidation } = require('../../middlewares/userValidation');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
    ctrlSignup,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent } = require('../../controllers/authController');

router.post('/users/signup', userValidation, asyncWrapper(ctrlSignup));
router.post('/users/login', userValidation, asyncWrapper(ctrlLogin));
router.get('/users/logout', asyncWrapper(ctrlLogout));
router.get('/users/current', asyncWrapper(ctrlCurrent));

module.exports = router;