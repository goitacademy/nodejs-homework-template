// const bcrypt = require("bcryptjs");

const service = require("../../model/users");

const { catchAsync } = require("../../utils/errorHandlers");

const register = catchAsync(async (req, res) => {
  const newUser = await service.createUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter", //??????
    },
  });
});

module.exports = register;
