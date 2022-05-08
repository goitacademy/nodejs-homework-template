const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    status: "success",
    user: { email, subscription },
  });
};
module.exports = getCurrent;
