const express = require('express')
const router = express.Router()
const { middlewareToken, upload } = require('../../middleware')
const ctrl = require('../../controllers/user')


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
 * @ PATCH /users/avatars
 */
router.patch('/avatars', upload.single('avatars'), ctrl.updateAvatar)

module.exports = router