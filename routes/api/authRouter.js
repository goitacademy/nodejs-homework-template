const express = require('express')

const {asyncWrapper} = require('../../helpers/apihelpers')

const {registrationController,
  loginController, logoutController, updateUser } = require('../../controllers/authController');
  
const { currentController} = require('../../controllers/gerCurrentController');



const { authMiddleware } = require('../../middlewares/authMiddleware');
const {uploadUserPhoto} = require('../../middlewares/uploadMiddleware');

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

router.use(uploadUserPhoto);
router
  .route('/avatars')
  .patch(asyncWrapper(updateUser));


module.exports = router;