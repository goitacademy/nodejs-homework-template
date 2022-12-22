// const { User } = require("../../models/users");

const getCurrent = (req, res) => {
  const { email, subscription = "starter" } = req.user;
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
