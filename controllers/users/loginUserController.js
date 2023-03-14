const { loginUser } = require("../../service/users/");
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password);
  const { token, subscription } = data;
  res.json({ status: "success", token, data: { email, subscription } });
};
module.exports = loginUserController;
