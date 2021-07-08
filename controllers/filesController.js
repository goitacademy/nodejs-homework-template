const uploadController = async (req, res) => {
  res.status(200).json({ upload: 'success' })
}

module.exports = {
  uploadController,
}
