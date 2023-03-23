const { catchAsync } = require('../../utils/index');
const createError = require('http-errors');

const { userLoginValidator } = require('../../utils');
const { User } = require('../../models/index');

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userLoginValidator({
    email,
    password,
  });
  if (error) {
    throw createError(400, error.message);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password))) {
    throw createError(401, `"Email or password is wrong"`);
  }

  res.status(200).json({
    status: 'ok',
    code: 201,
    token: 'exampletoken',
    data: { user: { email: user.email, subscription: user.subscription } },
  });
});

module.exports = login;
