const { catchAsync } = require('../../utils/index');
const createError = require('http-errors');

const { userRegisterValidator } = require('../../utils/index');
const { User } = require('../../models/index');

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log('---> ~ register ~ name:', name);

  // const { error } = userRegisterValidator(req.body);
  // if (error) {
  //   throw createError(400, error.message);
  // }

  // const user = User.findOne({ email });
  // if (user) {
  //   throw createError(409, `User with email ${email} already exist`);
  // }

  const newUser = await User.create({ name, email, password });

  newUser.password = undefined;

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result: newUser },
  });
});

module.exports = register;
