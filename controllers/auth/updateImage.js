const fs = require("fs/promises");
const path = require("path");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const userDir = path.join(__dirname, "../../public/avatars");
const Jimp = require("jimp");

const updateImage = async (req, res) => {
  const { token, _id } = req.user;
  const id = String(_id);

  const { path: tempUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(userDir, id, `${id}_${originalname}`);

    await fs.rename(tempUpload, resultUpload);
    await Jimp.read(resultUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    const image = path.join("/avatars", id, `${id}_${originalname}`);

    const user = await User.findOneAndUpdate({ token }, { avatarURL: image });

    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    const { avatarURL } = user;

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { updateImage };
