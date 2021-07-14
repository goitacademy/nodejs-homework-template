const {downloadUserAvatar} = require('../services/avatarsService')

const uploadController = async (req, res) => {
  res.json({ status: "success" })
}

const downloadController = async (req, res) => {
const { filename } = req.params
  await downloadUserAvatar(filename).catch(console.error);
  res.json({ status: "success" })
}

module.exports = {
  uploadController,
  downloadController
}
