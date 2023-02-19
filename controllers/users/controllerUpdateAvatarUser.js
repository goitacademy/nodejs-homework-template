const controllerUpdateAvatarUser = (req, res) => {
  // const { avatarFile } = req.file;
  res.status(200).json({ avatarURL: 'тут будет ссылка на изображение' });
};

module.exports = { controllerUpdateAvatarUser };
