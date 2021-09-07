const { users: service } = require("../../services");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

//path to the permanent folder
const usersDir = path.join(process.cwd(), "/public/avatars");

const uploadAvatar = async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const [extension] = originalname.split(".").reverse();
  const uniqueName = uuidv4() + "." + extension;
  const fileName = path.join(usersDir, uniqueName);

  try {
    await Jimp.read(tempName)
      .then((originalname) => {
        return originalname.resize(250, 250).quality(60).write(fileName);
      })
      .catch((error) => {
        next(error);
      });

    await service.update(req.user._id, { avatarURL: "/avatars/" + uniqueName });

    await fs.rename(tempName, fileName);
    res.json({
      status: "success",
      code: 200,
      data: {},
    });
  } catch (error) {
    await fs.unlink(tempName);
  }
};

module.exports = uploadAvatar;
