const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
require("dotenv").config();

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email in use");
  }

  const newUser = new User({ email, password });
  await newUser.save();

  return {
    status: "201 Created",
    data: {
      user: {
        email: email,
        subscription: "starter",
      },
    },
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.SECRET_KEY
  );

  const id = user._id;

  await User.findByIdAndUpdate(id, { token });

  return token;
};

const logout = async (authorization) => {
  const [, token] = authorization.split(" ");

  const user = jwt.decode(token, process.env.SECRET_KEY);
  const { _id } = user;

  await User.findByIdAndUpdate({ _id }, { token: null });

  return token;
};

const subscriptionUpdate = async (id, subscription) => {
  const index = ["starter", "pro", "business"].indexOf(subscription);

  if (index === -1) {
    throw new Error(
      "Subscription have to be one of 'starter', 'pro', 'business'"
    );
  }

  return User.findByIdAndUpdate(
    { _id: id },
    { subscription },
    { new: true }
  ).select({ email: 1, subscription: 1 });
};

module.exports = {
  registration,
  login,
  logout,
  subscriptionUpdate,
};
