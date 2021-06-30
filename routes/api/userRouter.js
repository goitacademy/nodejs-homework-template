const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  getUserController,
  updateSubscriptionController,
} = require('../../controllers/userController');
const {
  authenticationMiddleware,
} = require('../../middlewares/authenticationMiddleware');

router.get(
  '/current',
  authenticationMiddleware,
  asyncWrapper(getUserController),
);

router.patch(
  '/',
  authenticationMiddleware,
  asyncWrapper(updateSubscriptionController),
);

module.exports = { userRouter: router };
