const { User } = require("../models/usersSchema");

const signUpNewUser = async (email, password) => {
    const newUser = new User({ email });
    newUser.setPassword(password);
    return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne(email);
};

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
};

module.exports = {
    signUpNewUser,
    findUserByEmail,
    findUserByIdAndUpdate,
}