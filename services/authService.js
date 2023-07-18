const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const findUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
};

const registerNewUser = async ({ email, password }) => {
  const newUser = await new User({ email, password });
  newUser.setPassword(password);
  newUser.save();

  return newUser;
};

const loginUser = async (_id, token) => {
  await User.findByIdAndUpdate(_id, { token });
};

const logoutUser = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null });
};

const createToken = ({ _id }) => {
  const { SECRET_KEY } = process.env;
  const payload = {
    id: _id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const updateSubscription = async (_id, subscription) => {
  const subscriptionList = ["starter", "pro", "business"];

  if (!subscriptionList.includes(subscription)) {
    return null;
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $set: { subscription },
    },
    { new: true, select: "_id email subscription" }
  );

  return updatedUser;
};

module.exports = {
  findUserByEmail,
  registerNewUser,
  createToken,
  logoutUser,
  loginUser,
  updateSubscription,
};
