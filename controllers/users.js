const gravatar = require("gravatar");

const { User } = require("../models/user");

const createUser = async (email, password) => {
  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 1);
  const avatarURL = gravatar.url(email, { s: "250", d: "404" });

  try {
    const user = new User({
      email,
      password: hashedPassword,
      avatarURL,
    });
    user.save();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserByToken = async (token) => {
  const user = await User.findOne({ token });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const logout = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { token: '' } },
      { new: true }
    );
    user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const currentUser = async (req, res) => {
  try {
    const { token } = req.user;
    const user = await User.getUserByToken({ token });

    if (!user) {
      res.status(401).send("Not authorized");
    }
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
};


const updateAvatar = async (id, avatarURL) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { avatarURL },
    { new: true }
  );
};

module.exports = {
  createUser,
  getUserByToken,
  logout,
  currentUser,
  updateAvatar,
  getUserByEmail,
};