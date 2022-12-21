const { Unauthorized } = require("http-errors");
const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  const comparePass = bcrypt.compareSync(password, user.password);
  if (!user || !comparePass) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  try {
    res.json({
      status: "log in success",
      code: 200,
      data: {
        email,
        token,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
