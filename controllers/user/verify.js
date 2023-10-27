const User = require('../../models/users')
const { HttpError, handleReqError } = require('../../helpers')

const verify = async (req, res, next) => {
    const { verificationToken } = req.params

    const user = await User.resendVerifyEmail(verificationToken)

    if (!user) {
        return next(HttpError(404, 'User not found'))
    }

    await User.verifyUpdate(user._id, { verify: true, verificationToken: '' })

    res.json({
        message: 'Verification successful'
    })
}

module.exports = handleReqError(verify)