const express = require('express');
const router = express.Router();
const {
  authCheckValid,
  schemaValidator,
  filesHandler,
} = require('../../middlewares');
// const multer = require('multer');
// const  = require('../../middlewares/filesHandler');

const { users: ctrl } = require('../../controllers');

router.patch('/', authCheckValid, schemaValidator, ctrl.setSubscription);
router.get('/current', authCheckValid, ctrl.getCurrent);
router.post('/logout', authCheckValid, ctrl.logOut);
router.patch(
  '/avatar',
  authCheckValid,

  filesHandler.single('avatar'),
  ctrl.addAvatar
);

module.exports = router;
