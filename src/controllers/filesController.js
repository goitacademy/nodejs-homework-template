const avatarUpdater = async (req, res) => {
  console.log('req.file', req.file);
  console.log('req.body', req.body);

  res.status(200).json({ message: 'file upload' });
};

module.exports = {
  avatarUpdater,
};
