const {
  registerUserService,
} = require("../../servises/users/registerUserService");

const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registerUserService(email, password);
  res.status(201).json({ user });
};

module.exports = registerUserController;
