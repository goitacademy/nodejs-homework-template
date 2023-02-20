const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
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

module.exports = getCurrent;
