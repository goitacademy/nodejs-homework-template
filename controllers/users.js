const fs = require("node:fs/promises");
const path = require("node:path");

const User = require("../models/users");

const defaultImgPath = path.join(
  __dirname,
  "..",
  "public/avatars/avatar-40301b15-9f43-4929-8a1e-175314bb26d5.jpg"
);

const patchUser = async (req, res, next) => {
  
  try {
    if (!req.file) {
      const defaultImg = await fs.readFile(defaultImgPath);
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(defaultImg, "binary");
      return;
    }

    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename)
    );
    const result = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );
    if (result === null) {
      res.status(404).send({ message: "User not found" });
    }

    res.send({ avatarURL: req.file.filename });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchUser };
