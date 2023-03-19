const express = require('express')

const {asyncWrapper} = require('../../helpers/apihelpers')

const {registrationController,
    loginController} = require('../../controllers/authController');



const router = express.Router();


router.route('/users/register')
    .post(asyncWrapper(registrationController));


router
  .route('/users/login')
  .post(asyncWrapper(loginController))




module.exports = router;