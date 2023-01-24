const { User } = require("../../models/modelUser");
const { HttpError } = require("../../helpers");

const signUp = async (email, password) => {
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      throw HttpError(409, `Email in use, code:${err.code}`);
    }
    throw HttpError(409, err);
  }
};

module.exports = {
  signUp,
};
