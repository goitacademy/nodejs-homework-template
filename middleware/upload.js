const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const multerCongig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname) // переіменовуємо вхідний файл
  },
});

const upload = multer({
  storage: multerCongig,
  // limits: '',
})

module.exports = upload;


// const avatarsDir = path.join(__dirname, 'public', 'avatars')


// async( req, res) => {
//     const {path: tempUpload, originalname } = req.file;
//     const resultUpload = path.join(avatarsDir, originalname)
  
//     await fs.rename(tempUpload, resultUpload);
//     const avatarURL  = path.join( 'avatars', originalname);
  
//     const newContact = {
//         id: nanoid(),
//         ...req.body,
//         avatarURL,
//     }
  
//     contacts.puch(newContact)
//     console.log(contacts)
//     res.status(201).json(newContact);
//   }
