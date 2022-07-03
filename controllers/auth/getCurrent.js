// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  console.log(req.user);
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
