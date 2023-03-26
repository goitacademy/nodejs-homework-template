const { catchAsync } = require('../../utils');
const createError = require('http-errors');

const register = catchAsync(async (req, res, next) => {
  const { subscription } = req.body;
  console.log('---> ~ type:', typeof subscription);

  // ['starter', 'pro', 'business']

  if (
    subscription !== 'starter' &&
    subscription !== 'pro' &&
    subscription !== 'business'
  ) {
    throw createError(400, 'wrong type of subscription');
  }
  req.user.subscription = subscription;

  res.status(200).json({
    status: 'updated',
    code: 200,
    data: {
      user: {
        name: req.user.name,
        email: req.user.email,
        subscription: req.user.subscription,
      },
    },
  });
});

module.exports = register;
