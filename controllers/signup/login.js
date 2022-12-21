const { Unauthorized } = require("http-errors");
const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  const comparePass = bcrypt.compareSync(password, user.password);
  if (!user || !comparePass) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, "nka3424fewfwefew", { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "log in success",
    code: 200,
    data: {
      email,
      token,
      subscription,
    },
  });
};

module.exports = login;
