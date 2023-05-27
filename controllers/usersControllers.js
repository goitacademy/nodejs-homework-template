const {
  createUserService,
  loginService,
} = require("../services/usersServices");
const { ctrlWrapper } = require("../utils/decorators");
const bcrypt = require("bcrypt");

const createUser = ctrlWrapper(async (req, res) => {
  const { password, email } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await createUserService({ password: hash, email });

  res.status(201).json({
    user: {
      email,
      subscription: user.subscription,
    },
  });
});

const login = ctrlWrapper(async (req, res) => {
  const { token, email, subscription } = await loginService(req.body);

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
});

module.exports = {
  createUser,
  login,
};
