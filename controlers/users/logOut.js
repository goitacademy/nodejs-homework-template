const { User } = require("../../models");
const service = require("../../service");

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

module.exports = service.ctrlWrap(logOut);
