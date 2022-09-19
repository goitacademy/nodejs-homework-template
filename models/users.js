const { User } = require("../db/usersAuthModel");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const userSignUp = async (email, password) => {
  try {
    const user = new User({
      email,
      password,
    });

    await user.save();
    return user;
  } catch (error) {
    return error.message;
  }
};

const userLogin = async (email, password) => {
  try {
    const [user] = await User.find({ email }, { __v: 0, token: 0 });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error();
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    return error.message;
  }
};

const userLogout = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });

    user.token = null;
    await user.save();
  } catch (error) {
    return error.message;
  }
};

const getCurrentUser = async (token) => {
  try {
    const [user] = await User.find(
      { token },
      { subscription: 1, email: 1, _id: 0 }
    );

    return user;
  } catch (error) {
    return error.message;
  }
};

const updateUserSubscription = async (contactId, body) => {
  try {
    const { subscription } = body;

    await User.findOneAndUpdate(
      { _id: contactId },
      {
        $set: { subscription },
      }
    );
    const contact = await User.find({ _id: contactId });

    return contact;
  } catch (error) {
    return error.message;
  }
};

const updateUserAvatar = async (contactId, file) => {
  try {
    const newAvatarPath = path.resolve(
      `./public/avatars/avatar-${uuidv4()}.png`
    );
    const avatar = await Jimp.read(`${file}`);
    avatar.resize(250, 250);
    avatar.write(file);
    await fs.rename(file, newAvatarPath);

    await User.findOneAndUpdate(
      { _id: contactId },
      {
        $set: { avatarURL: newAvatarPath },
      }
    );
    const contact = await User.find(
      { _id: contactId },
      { avatarURL: 1, _id: 0 }
    );
    return contact;
  } catch (error) {
    await fs.unlink(file);
    return error.message;
  }
};

module.exports = {
  userSignUp,
  userLogin,
  userLogout,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
};
