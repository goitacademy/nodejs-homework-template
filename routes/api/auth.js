const express = require('express')
const router = express.Router()
const middlewareToken = require('../../middleware/middlewareToken')
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
router.post('/login', /* middlewareToken, */ ctrl.login)

router.use(middlewareToken)

/**
 * @ POST /users/logout
 * Отримує body {_id, password, email, subscription, token}
 * Викликає функцію logout
 */
router.post('/logout', /* middlewareToken, */ ctrl.logout)

router.get('/current', /* middlewareToken, */ ctrl.current)


module.exports = router