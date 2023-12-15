const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

const configPath = path.join(__dirname, "../../", "config", ".env");
dotenv.config({ path: configPath });
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passwordCompare)
    throw HttpError(401, "Email or password is incorrect");

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

module.exports = login;
