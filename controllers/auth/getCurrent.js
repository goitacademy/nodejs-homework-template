// const { userModel } = require("../../models/user");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    status: "success",
    code: "200",
    payload: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
