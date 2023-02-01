const { Conflict, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    data: {
      user: {
        email,
        subscription,
        token,
      },
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  console.log(email);
  console.log(subscription);
  res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
};
