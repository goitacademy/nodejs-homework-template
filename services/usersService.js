const { User } = require("../db");

const findUserInDb = async (email) => {
  return await User.findOne({ email });
};

const addNewUser = async (body) => {
    const {email, password} = body;
    const newUser = new User({email});
    newUser.setPassword(password);
    await newUser.save();
};

module.exports = {
  findUserInDb,
  addNewUser,
};
