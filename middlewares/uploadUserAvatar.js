const { AvatarsService } = require("../services");

const uploadUserAvatar = AvatarsService.upload('avatar');

module.exports = uploadUserAvatar;
