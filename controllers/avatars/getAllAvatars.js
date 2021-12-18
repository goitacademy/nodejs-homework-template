const fs = require('fs/promises');
const path = require('path');

const getAllAvatars = async (req, res) => {
  const avatar = req.params;

  const avatarsDir = path.join(__dirname, '../../publik/avatars');

  //   const { path: tempUpload, originalname } = req.file;
  //   const resultUploaded = path.join(avatarsDir, originalname);
  //   try {
  //     await fs.rename(tempUpload, resultUploaded);
  //     res.status(201).json({
  //       status: 'success',
  //       code: 201,
  //       message: 'avatar uploaded',
  //     });
  //   } catch (error) {
  //     await fs.unlink(tempUpload);

  fs.readFile('publik/avatars', function (err, data) {
    if (err) throw err;
    res.write(data);
  });
  //   }
  //   res.status(201).json(avatarsDir, avatar);
};

module.exports = getAllAvatars;
