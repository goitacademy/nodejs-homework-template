const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  avatarUploadController,
} = require('../../controllers/avatarsController');

const {
  authenticationMiddleware,
} = require('../../middlewares/authenticationMiddleware');

const FILE_DIR = path.resolve('./tmp');

const router = new express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const avatarUploadMiddleware = multer({ storage });

router.post(
  '/upload',
  authenticationMiddleware,
  avatarUploadMiddleware.single('avatar'),
  asyncWrapper(avatarUploadController),
);
router.use('/download', authenticationMiddleware, express.static(FILE_DIR));

module.exports = { avatarsRouter: router };
