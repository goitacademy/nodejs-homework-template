const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user.id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = login;
