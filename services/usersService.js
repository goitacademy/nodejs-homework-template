const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/userModel");

const registerUser = async (email, password) => {
  const user = new User({ email, password });
  const save = await user.save();
  return save;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }
  const decodePassword = await bcrypt.compare(password, user.password);
  if (!decodePassword) {
    return;
  }
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY
  );
  const updateUser = await User.findByIdAndUpdate(user.id, {
    $set: { token },
  });
  if (!updateUser) {
    return;
  }
  return { user, token };
};

const logoutUser = async (_id) => {
  await User.findByIdAndUpdate(_id, {
    $set: { token: null },
  });
};

const updateSubscription = async (_id, subscription) => {
  const update = await User.findByIdAndUpdate(_id, {
    $set: { subscription },
  });
  return update;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateSubscription,
};
