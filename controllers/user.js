const Jimp = require("jimp") ;

const fs = require("node:fs/promises");
const path = require("node:path");
const avatarsDir = path.resolve("public", "avatars");
const { User } = require("../models/user");

// async function main(req, res, next) {
//   // Read the image.
//   // const image = await Jimp.read("public/avatars/${user.avatar");
//   const user = await User.findById(req.user.id);
//   const image = res.sendFile(path.join(__dirname, "..", "public/avatars", user.avatar))
//   // Resize the image to width 150 and auto height.
//   await image.resize(250, Jimp.AUTO);

//   // Save and overwrite the image
//   await image.writeAsync("public/avatars/");
// }

// main();

async function getAvatar(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.avatar === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }
    // const avatarResize = await user.avatar.resize(250, 250, Jimp.RESIZE_BEZIER);
    // // const avatarResize = user.avatar;
    // console.log(avatarResize);
    res.sendFile(path.join(__dirname, "..", "public/avatars", user.avatar));
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  
  // if (!req.file) {
  //   throw HttpError(400, "Avatar must be provided");
  // }
  // const { id } = req.user.id;
  // console.log("USERId",req.user.id);
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file);
  const filename = `${req.user.id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(resultUpload); // resize
  });
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = filename;
  await User.findByIdAndUpdate(req.user.id, { avatar:avatarURL });
  res.status(200).json({ avatar:avatarURL });


  // try {
    
  //   await fs.rename(
  //     req.file.path,
  //     path.join(__dirname, "..", "public/avatars", req.file.filename)
  //   );
        
  //   const user = await User.findByIdAndUpdate(
  //     req.user.id,
  //     { avatar: req.file.filename },
  //     { new: true }
  //   );

  //   if (user === null) {
  //     return res.status(404).send({ message: "User not found" });
  //   }

  //   res.send(user.avatar);
  // } catch (error) {
  //   next(error);
  // }
}
// module.exports = { uploadAvatar };
module.exports = { uploadAvatar, getAvatar };