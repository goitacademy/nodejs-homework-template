const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const userControlers = require('../../controllers/userControllers');
const upload = require('../../helpers/upload');

router.post('/registration', userControlers.reg);
router.post('/login', userControlers.login);
router.post('/logout', guard, userControlers.logout);
router.get('/current', guard, userControlers.getCurrentUser);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  userControlers.avatars,
);

module.exports = router;
