const { catchAsync } = require('../../utils/index');
const createError = require('http-errors');

const { userRegisterValidator } = require('../../utils');
const { User } = require('../../models/index');

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = userRegisterValidator({ name, email, password });
  if (error) {
    throw createError(400, error.message);
  }

  // check if entered email alreaddy exists
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw createError(409, `User with email ${email} already exist`);
  }

  const newUser = await User.create({ name, email, password });

  newUser.password = undefined;

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result: newUser },
  });
});

module.exports = register;
