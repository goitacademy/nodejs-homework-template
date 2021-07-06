const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  getAllUsers,
} = require('../../controllers/authController')
const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const { validateUser } = require('../../middlewares/validationMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/register', validateUser, asyncWrapper(registrationController))

router.post('/login', validateUser, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/', asyncWrapper(getAllUsers))
//  що робить логаут. 1)Треба щоб юзер був залогінений, зробити таку перевірку.
// 2)Треба у хедерах ауторізейшн передати токен залогіненого юзера.
// 3)За допомогою jwt траба деактивізувати токен
module.exports = router
