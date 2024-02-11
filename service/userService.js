const User = require("./schemas/userSchemas");
const gravatar = require("gravatar");
const sendMail = require("../tools/sendGrid");
const { nanoid } = require("nanoid");

const signUpNewUser = async (email, pass) => {
  const avatarURL = gravatar.url(email, { s: "200", r: "pg" });
  const verificationToken = nanoid();
  const newUser = new User({ email, avatarURL, verificationToken });
  await newUser.setPassword(pass);
  await sendMail(email, verificationToken);
  await newUser.save();

  return newUser;
};

const findUserByEmail = async (email) => await User.findOne(email);

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
};

const setSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, subscription);
};

const updateAvatar = (id, avatarURL) =>
  User.findByIdAndUpdate(id, { avatarURL });

const updateVerificationToken = async (verificationToken) => {
  return await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    }
  );
};

module.exports = {
  signUpNewUser,
  findUserByEmail,
  findUserByIdAndUpdate,
  setSubscription,
  updateAvatar,
  updateVerificationToken,
};
