const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10min" });

  res.json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = login;
