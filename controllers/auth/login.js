const { User } = require("../../models/user");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;

const { HttpError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findOneAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email, subscription },
  });
};

module.exports = login;
