const fs = require("fs").promises;
const Jimp = require("jimp");

async function editAvatar(req, res, next) {
  const fileName =
    req.user._id + Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileType = req.file.mimetype.split("/")[1];
  await fs.writeFile(`./tmp/${fileName}.${fileType}`, req.file.buffer);
  Jimp.read(`./tmp/${fileName}.${fileType}`)
    .then((file) => {
      return file
        .resize(250, 250)
        .quality(60)
        .writeAsync(`./public/avatars/${fileName}.${fileType}`);
    })
    .catch((err) => {
      console.error(err);
    });
  req.file.path = `/public/avatars/${fileName}.${fileType}`;
  // await fs.unlink(`./tmp/${fileName}.${fileType}`);
  next();
}

module.exports = { editAvatar };
