const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { schemaAddUser } = require('../../schemas/validateshemasUser.js');
const { validateUser } = require('../../middlewares/validateUser');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const {
  controllerSingUpUser,
  controllerLoginUser,
  controllerLogoutUser,
  controllerGetUser,
  controllerUpdateAvatarUser,
} = require('../../controllers/users');

const tmpDir = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const [filename, extention] = file.originalname.split('.');
    cb(null, `${filename}.${extention}`);
  },
});

const uploadMiddleware = multer({ storage });

router.post('/users/signup', validateUser(schemaAddUser), controllerSingUpUser);
router.post('/users/login', validateUser(schemaAddUser), controllerLoginUser);
router.get('/users/logout', authMiddleware, controllerLogoutUser);
router.get('/users/current', authMiddleware, controllerGetUser);
router.patch(
  '/users/avatars',
  uploadMiddleware.single('avatar'),
  controllerUpdateAvatarUser
);

module.exports = router;
