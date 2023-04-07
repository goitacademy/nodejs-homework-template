const { User } = require("../models/userModel");
const { HttpError } = require("../helpers/httpError");
const { sendEmail } = require("./../helpers/sendEmail");

const currentUser = async (_id) => {
  return await User.findOne(
    { _id },
    { _id: 0, email: 1, subscription: 1, avatarURL: 1 }
  );
};

const changeUserSubscription = async (_id, subscription) => {
  return await User.findByIdAndUpdate({ _id }, subscription, {
    new: true,
    fields: {
      _id: 0,
      password: 0,
      token: 0,
    },
  });
};

const changeUserAvatar = async (_id, avatarURL) => {
  return await User.findByIdAndUpdate({ _id }, { avatarURL }, { new: true });
};

const reVerification = async ({ email }) => {
  if (!email) throw new HttpError(400, "Missing required field email");

  const user = await User.findOne({ email });

  if (!user) throw new HttpError(404, "User not found");

  const { verificationToken, verify } = user;

  if (verify) throw new HttpError(400, `Verification has already been passed`);

  await sendEmail(email, verificationToken);
};

module.exports = {
  currentUser,
  changeUserSubscription,
  changeUserAvatar,
  reVerification,
};
