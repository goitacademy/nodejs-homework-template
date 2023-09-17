const path = require("node:path");

const getAvatarsPath = () => {
  return path.join(__dirname, "..", "public", "avatars");
};

const getPath = () => {
    return path.join(__dirname, "..", "public");
  };

  const getTmp = () => {
    return path.join(__dirname, "../", "tmp");
  };

module.exports = {
    AVATARS_PATH: getAvatarsPath(),
    UPLOAD_DIR: getPath(),
    TMP_DIR: getTmp(),
  };