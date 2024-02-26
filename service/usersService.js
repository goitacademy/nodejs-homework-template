const { User } = require("./schemas/user.schema");
const gravatar = require("gravatar");

const signup = async (body) => {
  try {
    const { email, password, subscription } = body;
    const avatarURL = gravatar.url(email, {
      protocol: "https",
      s: "250",
      default: "robohash",
    });
    const newUser = new User({ email, password, subscription, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log("Adding user error:", error.message);
    throw error;
  }
};

const login = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log("Finding user error:", error.message);
    throw error;
  }
};

module.exports = {
  signup,
  login,
};
