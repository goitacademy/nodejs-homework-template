const { User } = require("../../models");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const updateAvatarCloudinary = async (req, res) => {
  const { path: pathFile, filename } = req.file;
  const { _id: id } = req.user;

  const [extention] = filename.split(".").reverse();
  const avatarName = `${id}.${extention}`;

  try {
    const options = {
      folder: "avatars",
      transformation: [
        { height: 250, width: 250, gravity: "face", crop: "thumb" },
        { radius: "max" },
        { effect: "outline:5", color: "#fff" },
        { background: "#fff" },
      ],
      use_filename: true,
      filename_override: avatarName,
      unique_filename: false,
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(pathFile, options);
    console.log(result.url);
    const avatarURL = result.url;
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateAvatarCloudinary };
