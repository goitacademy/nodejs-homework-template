const express = require('express');

const router = express.Router();
const { AVATARS_DIR } = require('../../helpers/uploadTemp')

router.use('', express.static(AVATARS_DIR));

module.exports = router;
