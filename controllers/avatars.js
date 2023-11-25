const fs = require("fs/promises");
const path = require("path");
async function avatar(req, res, next) {
  try {
    fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename)  // перемещает картинки с временной папки tmp в постоянную папку public/avatars
    );
  } catch (error) {}
  res.send(" Uploud avatar");
}

module.exports = {
  avatar,
};
