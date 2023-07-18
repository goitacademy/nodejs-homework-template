const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { SECRET_KEY } = process.env;

const HttpErrors = require("../helpers/HttpErrors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrors(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrors(401, "Email or password is wrong");
  }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpErrors(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id,  {token})
  res.json({ token });
};

const getCurrent = async (req, res) => {
const {email} = req.user;
res.json({
  email,

})
}

const logout = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});
  res.json({
message: "Logout success"
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout)
};
