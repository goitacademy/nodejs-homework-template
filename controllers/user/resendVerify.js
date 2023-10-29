// const User = require('../../models/users')
// const { HttpError, handleReqError } = require('../../helpers')
// const sendEmail = require('../../helpers/sendEmail')
// const { BASE_URL, SENDER_UKR_NET } = process.env

// const resendVerify = async (req, res, next) => {
//     const { email, verificationToken } = req.body
//     const user = await User.getUserByEmail(email)

//     if (!user) {
//         return next(HttpError(404, 'User not found'))
//     }
//     if (user.verify) {
//         return next(HttpError(400, 'Verification has already been passed'))
//     }

//     const verifyEmail = {
//         from: SENDER_UKR_NET,
//         to: user.email,
//         subject: 'Сonfirm your registration',
//         html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm your registration</a>`,
//     }

//     // try {
//     //     await sendEmail(verifyEmail);
//     //     res.json({
//     //         message: 'Verification email sent'
//     //     });
//     // } catch (error) {
//     //     next(HttpError(500, 'Internal Server Error'));
//     // }

//     await sendEmail(verifyEmail)

//     res.json({
//         message: 'Verification email sent'
//     })
// }

// module.exports = handleReqError(resendVerify)

const User = require('../../models/users')
const { HttpError, handleReqError } = require('../../helpers')


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