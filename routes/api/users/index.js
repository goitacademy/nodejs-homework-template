const express = require('express');
const {
  avatar
} = require('../../../controllers/users');
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')
const router = express.Router();
const guard = require('../../../middlewares/guard')
const upload = require('../../../middlewares/upload')

router.patch('/avatar', guard, upload.single('avatar'), wrapperError(avatar))

module.exports = router;