const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers/");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  // const comparePassword = await user.validatePassword(password);
  if (!comparePassword || !user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const token = "125sgds.3153tae.e5234234";
  res.json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = login;
