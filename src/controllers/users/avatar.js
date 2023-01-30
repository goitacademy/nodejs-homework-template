// const { userAvatar } = require("../../models/users");

// const avatar = async (req, res, next) => {
//   //   const data = await userAvatar();
//   res.status(200).json({ status: "200", mwssage: "success" });
// };
// module.exports = avatar;

// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
// const { userAvatar } = require("../../models/users");
// const avatarURLpath = path.join(process.cwd(), "temp");
// const uploadDir = path.resolve("../../../public");

// const avatar = async (req, res) => {
//   const { originalname, path: tmpDir } = req.file;
//   const { _id } = req.user;
//   console.log(originalname, "originalname");

//   try {
//     const [extension] = originalname.split(".").reverse();

//     const newImgName = `userAvatar_${_id}.${extension}`;
//     console.log(newImgName, "newImgName");
//     const originalImg = await Jimp.read(tmpDir);
//     const resizedImg = await originalImg.cover(250, 250);
//     await resizedImg.write(`${uploadDir}/avatars/${newImgName}`);
//     fs.unlink(tmpDir);
//     const avatar = path.join(avatarURLpath, newImgName);
//     const result = await userAvatar(avatar, _id);
//     const { avatarUrl } = result;
//     res.status(200).json({ avatarUrl });
//   } catch (error) {
//     fs.unlink(tmpDir);
//     res.json({ error });
//   }
// };

const fs = require("fs").promises;
const path = require("path");
const { User } = require("../../db/usersModel");
const storeImage = path.join(process.cwd(), "public/avatars");
const Jimp = require("jimp");

const avatar = async (req, res, next) => {
  const { _id } = req.user;
  const { description } = req.body;
  const { path: temporaryName } = req.file;
  const fileName = path.join(storeImage, _id + ".jpeg");
  try {
    await fs.rename(temporaryName, fileName);
    await Jimp.read(fileName)
      .then((lenna) => {
        return lenna
          .resize(250, 250) // resize
          .write(fileName); // save
      })
      .catch((err) => {
        console.error(err);
      });
    await User.findByIdAndUpdate(_id, {
      avatarURL: `${req.protocol + "://" + req.get("host")}/avatars/${
        _id + ".jpeg"
      }`,
    });
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({
    description,
    status: 200,
    data: {
      avatarURL: `${req.protocol + "://" + req.get("host")}/avatars/${
        _id + ".jpeg"
      }`,
    },
  });
};

module.exports = avatar;
