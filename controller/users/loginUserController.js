const { loginUserService } = require("../../servises/users/loginUserService");

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserService(email, password);
  res.status(201).json({ user });
};

module.exports = loginUserController;
