// const multer = require('multer');

// const path = require('path');

// const fs = require('fs/promises');

// const tempDir = path.join(process.cwd(), "tmp");

// const avatarsDir = path.join(process.cwd(), "public", "avatars");


// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// });

// const uploadUserAvatar = multer({
//   storage: multerConfig
// });


// module.exports = uploadUserAvatar;