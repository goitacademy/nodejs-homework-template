// const multer = require('multer');
// const path = require('path');

// const TEMP_DIR = path.join(__dirname, process.env.TEMP_DIR);
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, TEMP_DIR);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.includes('images')) {
//       cb(null, true);
//     }
//     cb(null, false);
//   },
// });

const avatarUpdater = async (req, res) => {
  // upload.single('file')
  await console.log(req.body);

  res.status(200).json({ message: 'file upload' });
};

module.exports = {
  avatarUpdater,
};
