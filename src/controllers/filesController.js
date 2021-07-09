const { avatarSaver } = require('../helpers/avatarSaver')

const { findUser } = require('../model/authService')

const avatarUpdater = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await findUser(_id);

  if (req.file) {
    const { file } = req;
    const fileName = await avatarSaver(file)
    const newAvatarUrl = ('/avatars/' + fileName)
    currentUser.avatarURL = newAvatarUrl;
    await currentUser.save();
    const { avatarURL } = currentUser
    res.status(200).json({ avatarURL });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'please, download file' });
  }
};

module.exports = {
  avatarUpdater,
};
