const { join, resolve } = require("path");

const {
  currentUser,
  changeUserSubscription,
  changeUserAvatar,
} = require("../services/userServices");

const avatarsDir = resolve("./public/avatars");

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
  const { path, originalname } = req.file;
  const { _id } = req.user;

  const userAvatarName = `${_id}_${originalname}`;

  const publicPath = join(avatarsDir, userAvatarName);

  const avatarURL = join("avatars", userAvatarName).replace(/\\/g, "/");

  await changeUserAvatar(_id, path, publicPath, avatarURL);

  res.status(200).json({
    status: "success",
    code: "200",
    user: {
      avatarURL,
    },
  });
};

module.exports = {
  currentUserController,
  subscriptionUserController,
  changeUserAvatarController,
};
