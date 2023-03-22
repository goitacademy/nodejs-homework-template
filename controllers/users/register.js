const { catchAsync } = require("../../utils/index");

const { userRegisterValidator } = require("../../utils/index");

const register = catchAsync(async (req, res, next) => {
  const { error } = userRegisterValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }
});

module.exports = register;
