const { registrationUser, loginUser } = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registrationUser(email, password);
  res.json({ status: "succses" });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  return res.json({ status: "sucsess", token });
};
module.exports = { registrationController, loginController };
