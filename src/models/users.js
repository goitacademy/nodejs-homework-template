const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/usersModel");
require("dotenv").config();

const SECRET = process.env.SECRET_JWT;

const userSignUp = async (body) => {
  try {
    const data = new User({
      email: body.email,
      password: body.password,
      subscription: body.subscription ? body.subscription : "starter",
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

module.exports = {
  userLogIn,
  userCurrent,
  userLogOut,
  userSignUp,
};
