const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatars = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
  try {
    await fs.rename(tmpUpload, resultUpload);
  } catch (error) {
    await fs.unlink(tmpUpload);
  }
};

module.exports = avatars;
