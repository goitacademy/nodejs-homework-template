const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../model/user');

/* 1.перенести файл в папку public/avatars
-файлу необходимо присвоить уникальное имя ( если 2 файла с одним именем, 2 при сохранении удаляет первый),
добавляем к имени сохраняемого файла ID. ренирируем его через uuid
  2.найти изера в базе по id и заменить ему поле аватар  путь к файлу аватара
  3.вернуть ответ
*/
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;
  const [extension] = originalname.split('.').reverse();
  const filename = `${_id}.${extension}`
  const uploadDir = path.join(__dirname, '..//..//', 'public\\avatars', filename)
  try {
    await fs.rename(tempDir, uploadDir);
    const avatar = path.join('avatarts', filename)
    await User.findByIdAndUpdate(_id, { avatarURL: avatar });
    res.json({
      status: 'success',
      code: 200,
      message: 'Update avatar success'
    });
  } catch (error) {
    await fs.unlink(tempDir)
    // next(error)
  }
};

module.exports = updateAvatar;
