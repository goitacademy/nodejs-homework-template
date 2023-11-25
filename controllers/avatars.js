const fs = require("fs/promises");
const path = require("path");
const User = require("../models/user");

async function avatar(req, res, next) {
  try {
    fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename) // перемещает картинки с временной папки tmp в постоянную папку public/avatars
    );

    // получаем данные пользователя, обновляем поле avatarURL
    const userAvatar = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    ).exec();

    if (userAvatar === null) {
      res.status(401).send({ message: "Not authorized" });
    }

    res.status(200).send(userAvatar);
  } catch (error) {
    next(error);
  }
  
}

module.exports = {
  avatar,
};
