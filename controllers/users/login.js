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
  console.log('---> ~ login ~ user:', user);
  if (!user) {
    throw createError(401, `"Email or password is wrong"`);
  }
  const passwordIsValid = await user.checkPassword(password, user.password);
  if (!passwordIsValid) {
    throw createError(401, `"Email or password is wrong"`);
  }

  res.status(200).json({
    status: 'ok',
    code: 201,
    data: { result: { email: user.email, subscription: user.subscription } },
  });
});

module.exports = login;
