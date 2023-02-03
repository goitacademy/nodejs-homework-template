const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { User } = require("../db/usersModel");
require("dotenv").config();

const SECRET = process.env.SECRET_JWT;

const userSignUp = async (body) => {
  try {
    const avatar = gravatar.url(
      body.email,
      {
        s: "250",
        d: "retro",
      },
      true
    );
    const data = new User({
      email: body.email,
      password: body.password,
      subscription: body.subscription ? body.subscription : "starter",
      avatarUrl: avatar,
    });
    await data.save();
    const user = {
      emai: body.email,
      subscription: body.subscription ? body.subscription : "starter",
    };
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const userLogIn = async ({ email, password }) => {
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return null;
    }
    if (!(await bcrypt.compare(password, currentUser.password))) {
      return null;
    }
    const token = jwt.sign({ _id: currentUser._id }, SECRET);
    const responseBody = {
      token,
      user: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    };
    await User.findByIdAndUpdate(currentUser._id, {
      $set: {
        token,
      },
    });
    return responseBody;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userLogOut = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(id, { token: null });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userCurrent = async (currentUser) => {
  try {
    if (!currentUser) {
      return null;
    }
    const user = {
      email: currentUser.email,
      subscription: currentUser.subscription,
    };
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userAvatar = async (avatar, id) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: avatar,
    },
    { new: true }
  );
  if (!result) {
    null;
  }
  return result;
};

module.exports = {
  userLogIn,
  userCurrent,
  userLogOut,
  userSignUp,
  userAvatar,
};
