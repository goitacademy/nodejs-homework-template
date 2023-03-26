// const createError = require('http-errors');

const { catchAsync } = require('../../utils/index');
const { User } = require('../../models');

const logout = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(204).json({
    status: 'success',
    code: 204,
    message: 'No content',
  });
});

module.exports = logout;
