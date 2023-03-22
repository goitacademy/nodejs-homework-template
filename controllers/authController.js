const { registration, login } = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body;

  await registration(email, password);

  res.status(201).json({
    message: "New user has been created!",
    status: "created",
    code: "201",
    user: {
      email,
      subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { token, subscription } = await login(email, password);

  res.status(200).json({
    status: "success",
    code: "200",
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = {
  registrationController,
  loginController,
};
