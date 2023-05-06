const path = require("path");

const avatarsPath = path.join(__dirname, "../../", "public", "avatars");
const tempPath = path.join(__dirname, "../../", "temp");

module.exports = {
  avatarsPath,
  tempPath,
};
