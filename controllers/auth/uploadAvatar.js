const fs = require("fs/promises");

const uploadAvatar = async (req, res) => {
  await fs.rename("./tmp/photo.jpg", "./public/avatars/photo.jpg");
  res.json({ status: "success" });
};

module.exports = uploadAvatar;
