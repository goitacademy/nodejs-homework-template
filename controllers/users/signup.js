const { User, HttpError } = require("../../models");

const signup = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new HttpError(409, "Email in use"));
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
