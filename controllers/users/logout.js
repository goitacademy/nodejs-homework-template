const { UserModel } = require("../../models");

const logout = async (req, res) => {
  const { id } = req.user;
  const user = await UserModel.findByIdAndUpdate(id, { token: null });
  res.status(200).json({
    code: 200,
    message: "logout success",
  });
};

module.exports = logout;
