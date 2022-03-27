const multer  = require('multer')
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      const fileExtension = file.originalname.split('.')[1];
      cb(null, `${req.user.id}.${fileExtension}`)
    }
  })
  
  const upload = multer({ storage: storage, 
    limits: {fileSize:1000000},
    fileFilter : (req, file, cb) => {
  
      if(file.mimetype.includes('image')) {
        return cb(null, true);
      }
    
      cb(new Error('Wrong format file!!!'))
    
    }
  
  })

  module.exports = upload;