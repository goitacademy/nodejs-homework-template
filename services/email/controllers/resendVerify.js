const User = require('../../models/email')
const { HttpError, handleReqError } = require('../../../helpers')


const resendVerify = async (req, res, next) => {
    const { verificationToken } = req.params
    const user = await User.findByVerifyToken(verificationToken)

    if (!user) {
        return next(HttpError(404, 'User not found'))
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.json({
        message: 'Verification email sent'
    })
}

module.exports = handleReqError(resendVerify)