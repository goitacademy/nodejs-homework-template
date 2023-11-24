const fs = require("node:fs/promises");
const path = require("node:path");

const User = require("../models/users");

const patchUser = async (req, res, next) => {
  try {
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

    res.send({"avatarURL":  req.file.filename });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchUser };
