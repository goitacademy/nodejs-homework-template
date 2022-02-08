const createError = require("http-errors");

const { User } = require("../../models");
const createToken = require("../../tokenService/createToken");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.isValidPassword(password)) {
    throw createError(401, "Email or password is wrong");
  }
  const token = await createToken(user._id);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
      token,
    },
  });
};

module.exports = loginUser;
