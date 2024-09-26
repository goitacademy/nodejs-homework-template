const { usersModel } = require("../../models/users");
const logout = async (req, res) => {
  const { id } = req.user;
  const result = await usersModel.findByIdAndUpdate(id, { token: "" });
  res.json(result);
};

module.exports = logout;
