const express = require('express')

const {asyncWrapper} = require('../../helpers/apihelpers')

const {registrationController,
  loginController, logoutController } = require('../../controllers/authController');
    
const { currentController} = require('../../controllers/gerCurrentController');


const { authMiddleware } = require('../../middlewares/authMiddleware');

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


module.exports = router;