const { join } = require("path");

const {
  currentUser,
  changeUserSubscription,
  changeUserAvatar,
  reVerification,
} = require("../services/userServices");

const currentUserController = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription, avatarURL } = await currentUser(_id);

  res.status(200).json({
    status: "success",
    code: "200",
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

const subscriptionUserController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await changeUserSubscription(_id, { subscription });

  res.status(200).json({
    status: "success",
    code: "200",
    user: {
      subscription,
    },
  });
};

const changeUserAvatarController = async (req, res) => {
  const { _id } = req.user;
  const { originalname } = req.file;

  const userAvatarName = `${_id}_${originalname}`;
  const avatarURL = join("avatars/", userAvatarName).replace(/\\/g, "/");

  await changeUserAvatar(_id, avatarURL);

  res.status(200).json({
    status: "success",
    code: "200",
    user: {
      avatarURL,
    },
  });
};

const reVerificationController = async (req, res) => {
  await reVerification(req.body);

  res.status(200).json({
    status: "200 Ok",
    message: "Verification email sent",
  });
};

module.exports = {
  currentUserController,
  subscriptionUserController,
  changeUserAvatarController,
  reVerificationController,
};
