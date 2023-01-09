const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config.js");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
      },
    },
  });
};

module.exports = login;
