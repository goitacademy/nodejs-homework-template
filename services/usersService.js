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

const updateUser = async (userId, data) => {
    return await User.findByIdAndUpdate({ _id: userId }, data, {
        new: true,
      });
}

module.exports = {
  findUserInDb,
  addNewUser,
  updateUser,
};
