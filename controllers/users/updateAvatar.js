const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
// const {BadRequest} = require("http-errors");

const { Unauthorized } = require("http-errors");
// const extensionList = require("./extensionList");
const avatarDir = path.join(__dirname, "../../", "public/avatars");
const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { id } = req.params;
  const { path: tempPath, filename } = req.file;
  // перевірка на валідність файла по розширенню
  // const [extension] = originalname.split(".").reverse();
  // if(!extensionList.includes(extension)){
  //     throw new BadRequest("Недопустимое расширение файла");
  // }
  const uploadPath = path.join(avatarDir, id, filename);
  try {
    const file = await Jimp.read(tempPath);
    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = `/avatars/${id}/${filename}`;
    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({
      status: "OK",
      code: 200,
      data: {
        avatarURL: avatarURL,
      },
    });
  } catch (err) {
    await fs.unlink(tempPath);
    throw new Unauthorized("Not authorized");
  }
};

module.exports = updateAvatar;
