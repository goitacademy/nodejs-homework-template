const express = require('express');

const router = express.Router();

// ============================================ files

const multer = require('multer');
const path = require('path');
const tempDir = path.resolve('tmp');
// const TEMP_DIR = path.join(__dirname, process.env.TEMP_DIR);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const upload = multer({ storage: storage });

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      console.log(file);
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

// ============================================ files

const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const {
  userDataValidation,
} = require('../../middlewares/userValidationMiddleware');

const AuthController = require('../../controllers/authController');
// const FilesController = require('../../controllers/filesController');

router.post(
  '/signup',
  userDataValidation,
  asyncWrapper(AuthController.registration)
);
router.post('/login', userDataValidation, asyncWrapper(AuthController.login));
router.post('/logout', authMiddleware, asyncWrapper(AuthController.logout));
router.post(
  '/current',
  userDataValidation,
  authMiddleware,
  asyncWrapper(AuthController.receiveCurrentUser)
);

router.patch('/avatars', upload.single('avatar'), async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  res.status(200).json({ message: 'file upload' });
});

module.exports = router;
