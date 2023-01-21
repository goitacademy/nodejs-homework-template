const { User } = require("../../model");

const getCurrent = async (req, res) => {
  console.log(req.user);
  const { name, email, subscription } = req.user;
  res.status(200).json({
    data: {
      user: {
        name,
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
