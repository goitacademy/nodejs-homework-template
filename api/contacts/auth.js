const {
  userSchema: { User },
} = require("../../models");
const { cntrlWrappers } = require("../../helpers");

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
    },
  });
};

module.exports = {
  register: cntrlWrappers(register),
};
