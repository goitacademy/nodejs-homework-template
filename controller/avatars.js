const sharp = require("sharp");
const path = require("path");
const { PUBLIC_DIR, AVATARS } = require("../helpers/path");
const { User } = require("../service/shemas/user");
const fs = require("fs").promises;
const imageController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { originalname } = req.file;
    const avatarURL = path.join(AVATARS, `${id}${path.extname(originalname)}`);
    await sharp(req.file.path)
      .resize({ width: 250, height: 250 })
      .toFile(path.join(PUBLIC_DIR, avatarURL));

    const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
    res.status(200).json({
      status: "success",
      code: 200,
      data: { user },
    });
  } catch (error) {
  } finally {
    await fs.unlink(req.file.path);
  }
};
module.exports = imageController;
