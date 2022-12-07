const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const { updateAvatar } = require("../services/usersService");

const setAvatarULR = (req, res) => {
  const oldAvatarPath = path.resolve(`./tmp/${req.body.avatar}`);
  const newAvatarPath = path.resolve(`./public/avatars/${req.body.avatar}`);

  Jimp.read(oldAvatarPath, (err, avatar) => {
    if (err) res.json(err);
    avatar.resize(250, 250).write(newAvatarPath);

    fs.unlink(oldAvatarPath, (err) => {
      if (err) res.json(err);
    });

    const avatarURL = `/avatars/${req.body.avatar}`;

    try {
      updateAvatar(avatarURL, req.body);
    } catch (err) {
      res.json(err);
    }

    res.json({
      avatarURL,
    });
  });
};

module.exports = { setAvatarULR };
