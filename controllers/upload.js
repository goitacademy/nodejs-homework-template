const Jimp = require("jimp");
const path = require("path");
const { updateAvatar } = require("../service/update.service");
const fs = require("fs").promises;

const userUpdateAvatar = async (req, res, next) => {
  const { path: tempPath, filename } = req.file;
  const avatarsDirectory = path.join(
    process.cwd(),
    "public/avatars/" + filename
  );
  const avatar = await Jimp.read(tempPath);
  await avatar.resize(250, 250).writeAsync(tempPath);

  try {
    await fs.rename(tempPath, avatarsDirectory);
  } catch (err) {
    await fs.unlink(tempPath);
    console.log(err);
  }

  if (req.file) {
    const result = await updateAvatar(req.user.id, avatarsDirectory);
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          avatarURL: result.avatarURL,
        },
      },
    });
  } else {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = {
  userUpdateAvatar,
};
