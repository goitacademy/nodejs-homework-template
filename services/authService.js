const { User } = require("../db/users");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

async function registration(email, password) {
  const avatarURL = gravatar.url(email);
  const user = new User({ email, password,avatarURL});
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

const updateUserAvatar = async (_id, avatarURL) => {
  const updatedAvatar = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );

  return updatedAvatar;
};

module.exports = {
  registration,
  login,
  findUser,
  logout,
  findUserId,
  updateUserAvatar
};
