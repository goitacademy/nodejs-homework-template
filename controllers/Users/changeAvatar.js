const path = require("path");
const fs = require("fs/promises");
const { usersModel } = require("../../models/users");
const avatarsPath = path.join("public", "avatars");

const changeAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const newAvatar = path.join("avatars", filename);
  await usersModel.findByIdAndUpdate(id, {
    avatarURL: newAvatar,
  });
  res.json({
    Status: 200,
    ContentType: "application/json",
    ResponseBody: {
      avatarURL: newAvatar,
    },
  });
};

module.exports = changeAvatar;
