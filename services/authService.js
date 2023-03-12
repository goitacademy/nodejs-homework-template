const { User } = require("../db/users");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registration(email, password) {
  const user = new User({ email, password });
  await user.save();
}

async function login(_id, token) {
  await User.findByIdAndUpdate(_id, { token });
}

async function logout(_id) {
  return await User.findByIdAndUpdate(
    _id,
    { token: null },
    {
      new: true,
    }
  );
}

async function findUserId(_id) {
  return await User.findById(_id);
}

async function findUser({ email }) {
  const user = await User.findOne({ email });
  return user;
}

module.exports = {
  registration,
  login,
  findUser,
  logout,
  findUserId,
};
