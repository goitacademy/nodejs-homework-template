const fs = require("node:fs/promises");
const path = require("node:path");
const { HttpError } = require("../../utils");
const { User } = require("../../models/user");

async function uploadAvatar(req, res, next) {
  console.log(req.file)
  try {
    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "..", "public", "avatars", req.file.filename)
    );
    const doc = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    ).exec();
    if (doc === null) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(doc);
  } catch (error) {
    next(HttpError(404));
  }
}
module.exports = {
  uploadAvatar,
};
