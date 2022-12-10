const { User } = require("../../models/user");

const singOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {
    token: null,
  });
  res.status(204).json();
};

module.exports = singOut;
