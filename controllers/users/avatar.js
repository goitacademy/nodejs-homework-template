require("dotenv").config();
const fs = require("node:fs/promises");
const path = require("node:path");
const User = require("../../models/users");
const Jimp = require("jimp");
async function avatar(req, res, next) {
  try {
    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "..", "public/avatars", req.file.filename)
    );
    Jimp.read(
      __dirname + `../../../public/avatars/${req.file.filename}`,
      (err, data) => {
        if (err) throw err;
        return data
          .resize(250, 250)
          .write(
            path.join(
              __dirname,
              "..",
              "..",
              "public/avatars",
              req.file.filename
            )
          );
      }
    );
    const doc = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    ).exec();

    if (doc == null) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.send(doc);
  } catch (error) {
    next(error);
  }
}
module.exports = { avatar };
