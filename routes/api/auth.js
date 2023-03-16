const express = require('express')
const router = express.Router()

// const { addContactValid, changeContactValid } = require('../../middlewares/validationMiddleware');
const { loginController, registarationController } = require('../../controllers/auth');


router.post('/register', registarationController)
router.post('/login', loginController)



module.exports = router