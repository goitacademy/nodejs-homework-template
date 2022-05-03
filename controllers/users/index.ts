const { update } = require("../../repository/users");
const { HTTP_STATUS_CODE } = require("../../libs/constants");
const AvatarService = require("../../services/avatar/avatarService");
const LocalStorage = require("../../services/avatar/local-storage");

const getCurrentUser = async (req, res) => {
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

const updateSubscription = async (req, res) => {
  const user = await update(req.user.id, req.body);
  return res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    message: "Subscription updated",
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const avatar = async (req, res, next) => {
  const avatarService = new AvatarService(LocalStorage, req.file, req.user);
  const urlOfAvatar = await avatarService.update();
  res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: { avatarURL: urlOfAvatar },
    message: "Avatar updated",
  });
};

module.exports = {
  getCurrentUser,
  updateSubscription,
  avatar,
};
export {};
