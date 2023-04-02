const express = require('express')

const {asyncWrapper} = require('../../helpers/apihelpers')

const {registrationController,
  loginController, logoutController} = require('../../controllers/authController');
  
const { currentController} = require('../../controllers/gerCurrentController');

const { updateAvatarController} = require('../../controllers/uploadController');

const { authMiddleware } = require('../../middlewares/authMiddleware');

const {upload} = require('../../middlewares/uploadMiddleware');

const router = express.Router();


router.
  route('/register')
  .post(asyncWrapper(registrationController));


router
  .route('/login')
  .post(asyncWrapper(loginController));

router.use(authMiddleware);
router
  .route('/logout')
  .post(asyncWrapper(logoutController));

  
router.use(authMiddleware);
router
  .route('/current')
  .post(asyncWrapper(currentController));

router.use(authMiddleware);
router
  .route('/avatars')
  .patch(upload.single("avatar"), asyncWrapper(updateAvatarController));


module.exports = router;