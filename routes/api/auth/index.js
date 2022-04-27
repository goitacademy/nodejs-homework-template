const express = require('express');
const {
  registration, login, logout, current, verifyUser, reverifyEmail
} = require('../../../controllers/auth');
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')

const router = express.Router();
const guard = require('../../../middlewares/guard')

router.post('/registration', wrapperError(registration));
router.post('/login', wrapperError(login));
router.post('/logout', guard, wrapperError(logout));
router.post('/current', guard, wrapperError(current));

router.get('/verify-email/:token', wrapperError(verifyUser));
router.post('/verify-email', wrapperError(reverifyEmail));

module.exports = router;