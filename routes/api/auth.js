const express = require('express')
const router = express.Router()
const { middlewareToken, upload } = require('../../middleware')
const ctrl = require('../../controllers/user')

const User = require('../../models/users')
const { HttpError } = require('../../helpers')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const serverSMTP = 'smtp.ukr.net'
const portSMTP = 2525
const sender = process.env.SENDER_UKR_NET
const password = process.env.PASSWORD_UKR_NET
const { v4: uuidv4 } = require('uuid');


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
 */
router.get('/verify/:verificationToken', ctrl.resendVerify)

/**
 * @POST /users/verify
 */
router.post('/verify', async (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({ message: 'Missing required field email' });
    }

    const { email } = req.body
    const user = await User.getUserByEmail(email);

    if (!user) {
        return next(HttpError(404, 'User not found'))
    }

    if (user.verify) {
        return res.status(400).json({
            message: 'Verification has already been passed'
        })
    }

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken
    await user.save()

    const transporter = nodemailer.createTransport({
        host: serverSMTP,
        port: portSMTP,
        secure: true,
        auth: {
            user: sender,
            pass: password
        },
        debug: true
    })

    const mailOptions = {
        from: sender,
        to: email,
        subject: 'Verification Email',
        html: `Click this link to verify your email: ${verificationToken}`
    }

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error('Error sending verification email:', err)
            return res.status(500).json({
                message: 'Error sending verification email'
            })
        }
        res.status(200).json({
            message: 'Verification email sent'
        })
    })
})

module.exports = router