const path = require("node:path");

const getAvatarsPath = () => {
  return path.join(__dirname,"..","public", "avatars");
};

const getPath = () => {
    return path.join(__dirname, "..", "public");
  };

module.exports = {
    AVATARS_PATH: getAvatarsPath(),
    UPLOAD_DIR: getPath(),
}