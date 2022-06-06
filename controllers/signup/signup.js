const { User } = require("../../models");
const createError = require("http-errors");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `Email ${email} in use. Conflict`);
  }
  const result = await User.create({ email, password, subscription });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;
