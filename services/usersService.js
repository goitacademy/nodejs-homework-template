const { User } = require("../db/userModel");
const { WrongParametersError } = require("../Helpers/errors");
const sgMail = require("@sendgrid/mail");

const updateToken = async (userId, token) => {
  const data = await User.findOneAndUpdate(
    { _id: userId },
    { token: token },
    { new: true }
  );
  return data;
};
const getUser = async (userId) => {
  const user = await User.findOne({ _id: userId }).select({
    __v: 0,
    _id: 0,
    password: 0,
  });
  return user;
};
const updateSubscription = async (userId, sub) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { subscription: sub } },
    { new: true }
  ).select({
    __v: 0,
    token: 0,
    password: 0,
  });

  if (!updatedUser) {
    throw new WrongParametersError(
      `Cannot update subscription in user by id:${userId}`
    );
  }

  return updatedUser;
};

const updateAvatar = async (userId, avatar) => {
  const updatedAvatar = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { avatarURL: `/avatars/${avatar}` } },
    { new: true }
  );
  return updatedAvatar;
};
const verification = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new WrongParametersError(`'User not found'`);
  }

  await user.updateOne({ verify: true, verificationToken: null });
  return user;
};

const reVerifi = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new WrongParametersError(`'User not found'`);
  }
  if (user.verify === true) {
    throw new WrongParametersError(`'User verify'`);
  }
  const msg = {
    to: email,
    from: "tsukotaed@gmail.com",
    subject: "Resending your the activation link",
    text: `Please confirm your email address GET  http://localhost:8080/api/users/verify/${user.verificationToken}`,
    html: `Please confirm your email address GET  http://localhost:8080/api/users/verify/${user.verificationToken}`,
  };
  await sgMail.send(msg);
  return user;
};
module.exports = {
  updateToken,
  getUser,
  reVerifi,
  verification,
  updateAvatar,
  updateSubscription,
};
