const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "seccess",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
