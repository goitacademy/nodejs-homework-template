const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(400, "Verification was not passed");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const { name, email: userEmail, subscription, avatarURL } = user;
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { name, email: userEmail, subscription, avatarURL },
  });
};

module.exports = login;
