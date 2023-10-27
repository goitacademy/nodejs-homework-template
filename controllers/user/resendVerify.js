const User = require('../../models/users')
const { HttpError, handleReqError } = require('../../helpers')
const { sendEmail } = require('../../helpers/sendEmail')
const randomUUID = require('crypto')
const { BASE_URL } = process.env

const resendVerify = async (req, res, next) => {
    const { email } = req.body
    const verificationToken = randomUUID()
    const user = await User.resendVerifyEmail(email)

    if (!user) {
        return next(HttpError(404, 'User not found'))
    }
    if (user.verify) {
        return next(HttpError(400, 'Verification has already been passed'))
    }

    const verifyEmail = {
        to: email,
        subject: 'Сonfirm your registration',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to confirm your registration</a>`,
    }

    await sendEmail(verifyEmail)

    res.json({
        message: 'Verification email sent'
    })
}

module.exports = handleReqError(resendVerify)