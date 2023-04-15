const express = require('express');

const {
    registrationController,
    loginController,
    logoutController,
    currentUserController
} = require('../../controllers/users/index');

const { asyncWrapper } = require("../../helpers/index");
const {addUserValidation, authMiddleware} = require('../../middlewares/index');


const router = new express.Router();


router.post('/register', addUserValidation, asyncWrapper(registrationController));
router.post('/login', addUserValidation, asyncWrapper(loginController));
router.post('/logout', authMiddleware, asyncWrapper(logoutController));
router.get('/current', authMiddleware, asyncWrapper(currentUserController));



module.exports = {usersRouter: router};
