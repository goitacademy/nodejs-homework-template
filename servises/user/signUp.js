const gravatar = require("gravatar");
const { User } = require("../../models/modelUser");
const { HttpError } = require("../../helpers/error");

const signUp = async (email, password) => {
  const avatarURL = gravatar.url(email, { s: "200" });

  try {
    const user = new User({
      email,
      password,
      avatarURL,
    });

    await user.save();

    return user;
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
