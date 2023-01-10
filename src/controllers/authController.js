const { registration, login } = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);
  res.status(200).json({ message: "User registered" });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.status(200).json({ message: "Login successful", token });
};

module.exports = {
  registrationController,
  loginController,
};
