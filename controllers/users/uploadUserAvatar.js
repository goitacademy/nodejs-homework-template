// const fs = require("fs/promises");

const ctrlWrapper = require("../../utils/ctrlWrapper");

const uploadUserAvatar = async (req, res) => {
  // res.json({avatarURL});
};

module.exports = { uploadUserAvatar: ctrlWrapper(uploadUserAvatar) };
