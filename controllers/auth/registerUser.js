const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../service");
const RequestError = require("../../helpers/RequestError");

const registerUser = async (req, res) => {
  const { email, password, subscription } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  } else {
    const secureUrl = gravatar.url(
      email,
      { s: "100", r: "x", d: "retro" },
      true
    );
    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL: secureUrl,
    });
    res.status(201).json({
      code: 201,
      status: "success",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  }
};
module.exports = registerUser;
