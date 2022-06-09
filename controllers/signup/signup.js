const { User } = require("../../models");
const createError = require("http-errors");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `Email ${email} in use. Conflict`);
  }

  const newUser = new User({ email, password, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;
