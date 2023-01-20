const { avatarService } = require("../../services/uploadService/avatarService");

const avatarController = async (req, res) => {
  const { path } = req.file;
  const { _id } = req.user;

  const url = await avatarService(path, _id);

  res.json({ avatarURL: url });
};

module.exports = { avatarController };
