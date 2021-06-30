const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  registrationController,
  loginController,
} = require('../../controllers/authenticationController');

// const { getUserController } = require('../../controllers/userController');
// const {
//   authenticationMiddleware,
// } = require('../../middlewares/authenticationMiddleware');

router.post('/signup', asyncWrapper(registrationController));

router.post('/login', asyncWrapper(loginController));

// router.use(authenticationMiddleware);

// router.get('/current', asyncWrapper(getUserController));

module.exports = { authRouter: router };
