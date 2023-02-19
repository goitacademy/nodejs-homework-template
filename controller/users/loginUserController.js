const { loginUserService } = require("../../servises/users/loginUserService");

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const answer = await loginUserService(email, password);
  res.status(200).json({ answer });
};

module.exports = loginUserController;
