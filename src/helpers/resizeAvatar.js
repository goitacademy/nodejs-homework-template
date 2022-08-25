const Jimp = require("jimp");

function resizeAvatar(avatarPath) {
  Jimp.read(avatarPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(avatarPath);
  });
}

module.exports = resizeAvatar;
