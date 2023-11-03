const express = require('express')
const router = express.Router()
const { middlewareToken, upload } = require('../../middleware')
const ctrl = require('../../controllers/user')
const ctrlEmail = require('../../services/email/controllers')

/**
 * @ POST /users/registration
 * Отримує body {_id, password, email, subscription}
 * Викликає функцію register
 */
router.post('/registration', ctrl.register)

/**
 * @ POST /users/login
 * Отримує body {_id, password, email, subscription, token}
 * Викликає функцію login
*/
router.post('/login', ctrl.login)

/**
 * add middlewar
 */
router.use(middlewareToken)

/**
 * @ POST /users/logout
 * Отримує body {_id, password, email, subscription, token}
 * Викликає функцію logout
 */
router.post('/logout', ctrl.logout)

/**
 * @ POST /users/current
 * Отримує body {email, password}
 * Викликає функцію current
 */
router.get('/current', ctrl.current)

/**
 * @ PATCH /users/
 * Отримує оновлену підписку
 * Викликає функцію updateSubscription
 */
router.patch("/", ctrl.updateSubscriptionCtrl);

/**
 * @ PATCH /users/avatars
 * Отримує оновлену аватарку
 * Викликає функцію updateAvatar
 */
router.patch('/avatars', upload.single('avatars'), ctrl.updateAvatar)

/**
 * @ GET /users/verify/:verificationToken
 * Отримує лист "Сonfirm your registration" та верівікацію
 * Викликає функцію resendVerify
 */
router.get('/verify/:verificationToken', ctrlEmail.resendVerify)

/**
 * @POST /users/verify
 * Отримує лист "Verification email sent" з верифікацією
 * Викликає функцію verify
 */
router.post('/verify', ctrlEmail.verify)

module.exports = router