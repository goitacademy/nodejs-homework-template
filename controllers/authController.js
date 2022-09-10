const { login } = require("../services/authService");
const { User } = require("../db/userModel");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const findUser = await User.findOne({ username: username });
  if (!findUser) {
    return res.status(404).json({
      message: "unauthorized",
      description: "Not successful, invalid username or password",
    });
  }

  if (!(await bcrypt.compare(password, findUser.password))) {
    return res.status(404).json({
      message: "unauthorized",
      description: "Not successful, invalid username or password",
    });
  }

  const user = await login(username, password);

  res.json({ status: "success", user });
};

module.exports = {
  loginController,
};
