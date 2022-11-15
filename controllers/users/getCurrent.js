const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email, token, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription,
        token,
      },
    },
  });
};

module.exports = getCurrent;
