const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jimp = require("jimp");

const uploadDir = path.join(process.cwd(), "tmp");
const storeDir = path.join(process.cwd(), "public/avatars");

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
const allowedMimetypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const isAllowedExtension = (extension) => {
  if (allowedExtensions.includes(extension)) {
    return true;
  }
  return false;
};
const isAllowedMimetype = (mimetype) => {
  if (allowedMimetypes.includes(mimetype)) {
    return true;
  }
  return false;
};
const isImage = async (path) => {
  return new Promise(resolve=>{
    jimp.read(path).then(result=> {
      try {
        result.resize(250,250).write(path);
        resolve(true) 
      } catch (err) {
        console.log('invalid image file');
        resolve(false)
      }
  }).catch(err=>{console.log(err);
  resolve(false)})
})
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
});

const multerInstance = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const mimetype = file.mimetype;
    if (!isAllowedExtension(extension) || !isAllowedMimetype(mimetype)) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1231234,
  },
});

const isAccessible = async (path) => {
  fs.access(path)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const createFolderIfNotExist = async (folder) => {
  try {
    if (!(await isAccessible(folder))) {
      await fs.mkdir(folder);
    }
  } catch (err) {}
};

module.exports = {
  createFolderIfNotExist,
  uploadDir,
  storeDir,
  multerInstance,
  isImage,
};
