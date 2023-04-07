const { User } = require("../models/user");
const { hashPassword } = require("../models/user.js");

const createUser = async (email, password) => {
  const hashedPassword = hashPassword(password);

  try {
    const user = new User({
      email,
      password: hashedPassword,
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

const logout = async (token) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: token._id },
      { $set: { tokens: [] } },
      { new: true }
    );
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

module.exports = { createUser, getUserByToken, logout, currentUser };
