const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const current = async (req, res) => {
  const { token } = req.user;
  const user = await User.findOne({ token });

  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  const { email, subscription } = user;

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = { current };
