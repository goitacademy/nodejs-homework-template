const express = require('express');

const router = express.Router();
const path = require('path');

const avatarsDir = path.resolve('./public/avatars');

router.use('', express.static(avatarsDir));

module.exports = router;
