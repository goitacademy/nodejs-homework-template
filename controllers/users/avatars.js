const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatars = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
  try {
    await fs.rename(tempDir, resultUpload);
    res.status(201);
  } catch (error) {
    await fs.unlink(tempDir);
  }
};

module.exports = avatars;
