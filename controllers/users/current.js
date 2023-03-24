const { catchAsync } = require('../../utils');
const createError = require('http-errors');

const { User } = require('../../models');

const current = catchAsync(async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
});

module.exports = current;
