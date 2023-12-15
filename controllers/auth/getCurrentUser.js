const { User } = require("../../models");

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrentUser;
