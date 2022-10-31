const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !user.verify || !passCompare) {
    throw new Unauthorized("Email is wrong or not verify, or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const subscription = user.subscription;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    ResponseBody: {
      token: token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
