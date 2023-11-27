const fs = require("fs/promises");
const path = require("path");
const User = require("../models/user");
const jimp = require("jimp");

// дефолтный аватар
  const defaultImg = path.join(
    __dirname,
    "..",
    "puclic/avatars/default.jpg"
  );

async function avatar(req, res, next) {
  // редактируем фото через пакет jimp
  const img = await jimp.read(req.file.path);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(req.file.path);

  try {
    // проверяем действительно ли файл прикреплён к запросу
    if (!req.file) {
      const img = await fs.readFile(defaultImg)
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(img);
      return;
    }
    fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename) // перемещаем картинки с временной папки tmp в постоянную папку public/avatars
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
