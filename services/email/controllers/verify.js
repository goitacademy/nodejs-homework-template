const User = require('../../../models/users')
const { HttpError, handleReqError } = require('../../../helpers')
const sendEmail = require('../../email/helpers/sendEmail')
const { SENDER_UKR_NET } = process.env

const resendVerify = async (req, res, next) => {
    const { email, verificationToken } = req.body
    const user = await User.getUserByEmail(email)

    if (!user) {
        return next(HttpError(404, 'User not found'))
    }
    if (user.verify) {
        return next(HttpError(400, 'Verification has already been passed'))
    }

    user.verificationToken = verificationToken
    await user.save()

    const verifyEmail = {
        from: SENDER_UKR_NET,
        to: user.email,
        subject: 'Verification Email',
        html: `Click this link to verify your email: ${verificationToken}`,
    }

    await sendEmail(verifyEmail)

    res.json({
        message: 'Verification email sent'
    })
}

module.exports = handleReqError(resendVerify)