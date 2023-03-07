const { HttpError } = require("../../helpers/HttpError");
const { User } = require("../../models/user");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const storedUser = await User.findOne({
    email,
  });
  if (!storedUser) {
    throw new HttpError(401, "Email is wrong ");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "Password is wrong ");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15h",
  });
  return res.json({
    data: {
      token: token,
    },
  });
};

module.exports = login;