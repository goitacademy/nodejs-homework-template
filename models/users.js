const { User } = require("../db/usersAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const updateSubscriptionUser = async (contactId, body) => {
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

module.exports = {
  userSignUp,
  userLogin,
  userLogout,
  getCurrentUser,
  updateSubscriptionUser,
};
