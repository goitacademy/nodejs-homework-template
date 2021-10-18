const path = require('path');
const fs = require('fs').promises;
const { User } = require('../../model/user');

const chengeAvatar = async (req, res) => {
  /* 1.перенести файл в папку public/avatars
    2.найти изера в базе по id и заменить ему в аватар  путь к файлу
    3.вернуть ответ
 */
  const { path: tempDir, originalname } = req.file;
  const uploadDir = path.jpin(__dirname, 'public\\avatars', originalname)
  const { id } = req.user;
  await fs.rename(tempDir, uploadDir);
  await User.findByIdAndUpdate(_id,
    { avatarURL: uploadDir }
  );
  res.status(200).json({
    code: 200,
    status: 'success',
    contentType: 'application/json',
    data: {
      avatarURL: uploadDir
    }
  }
  )
};

module.exports = chengeAvatar;
