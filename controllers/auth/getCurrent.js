const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    message: "Current user",
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
