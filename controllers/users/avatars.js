const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatars = async (req, res) => {
  try {
    //get path to temp file and to avatar dir
    const { path: temporaryName, originalname } = req.file;
    const [name, ext] = originalname.split(".");
    const { id } = req.user;
    const loadPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "avatars",
      `${id}.${ext}`
    );

    //resize, rename avatar and replace to public

    const updAvatar = await Jimp.read(temporaryName);
    updAvatar
      .resize(250, 250) // resize
      .write(loadPath); // save
    await fs.unlink(temporaryName);

    //report success
    res.status(200).json({
      code: 200,
      message: "success",
      avatarURL: path.join("avatars", `${id}.${ext}`),
    });
  } catch (error) {
    //catch error
    console.log(error);
    res.status(400);
    throw new Error("Unable to load avatar");
  }
};

module.exports = avatars;
