const { HTTP_STATUS_CODE } = require("../../libs/constant");
const AvatarService = require("../../services/avatar");
// const LocalStorage = require("../../services/avatar/local-storage");
const CloudStorage = require("../../services/avatar/cloud-storage");

const avatar = async (req, res, next) => {
  // const avatarService = new AvatarService(LocalStorage, req.file, req.user);
  const avatarService = new AvatarService(CloudStorage, req.file, req.user);
  const urlOfAvatar = await avatarService.update();
  res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { avatar: urlOfAvatar },
  });
};

module.exports = { avatar };
