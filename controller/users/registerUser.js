// const bcrypt = require("bcryptjs");

const service = require("../../model/users");

const { catchAsync } = require("../../utils/errorHandlers");

const register = catchAsync(async (req, res) => {
  // const { password } = req.body;

  // const salt = bcrypt.genSaltSync(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  // const newUser = await service.createUser({
  //   ...req.body,
  //   password: hashPassword,
  // });
  const newUser = await service.createUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter", //??????
    },
  });
});

module.exports = register;
