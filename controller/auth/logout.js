const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user) {
    throw RequestError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
