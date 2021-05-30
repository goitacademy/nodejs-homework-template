const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/multer');

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);
router.patch('/avatars', guard, upload.single('avatar'), ctrl.avatars);

module.exports = router;
