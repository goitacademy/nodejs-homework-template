const express = require('express');
const router = new express.Router();
const { userValidation } = require('../../middlewares/userValidation');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
    ctrlSignup,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrent,
    ctrlChangeSubscription} = require('../../controllers/authController');

router.post('/users/signup', userValidation, asyncWrapper(ctrlSignup));
router.post('/users/login', userValidation, asyncWrapper(ctrlLogin));
router.get('/users/logout', authMiddleware, asyncWrapper(ctrlLogout));
router.get('/users/current', authMiddleware, asyncWrapper(ctrlCurrent));
router.patch('/users', authMiddleware, asyncWrapper(ctrlChangeSubscription));

module.exports = router;