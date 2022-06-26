const { User } = require("../../models/user");

const logout = async (res, req) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

module.exports = logout;
