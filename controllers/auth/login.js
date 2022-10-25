const { User } = require("../../models/users");

const bcrypt = require("bcryptjs");

const { RequestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password wrong");
  }

  const token = "123123.123123245gerf.2345435refgwer";

  res.json({
    token,
  });
};

module.exports = login;
