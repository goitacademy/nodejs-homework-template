const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { catchAsync } = require('../../utils/index');
const { userLoginValidator } = require('../../utils');
const { User } = require('../../models/index');

const { SECRET_KEY } = process.env;

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

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: 'ok',
    code: 200,
    token,
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
});

module.exports = login;
