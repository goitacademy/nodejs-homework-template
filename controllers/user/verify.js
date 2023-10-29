// const User = require('../../models/users')
// const { HttpError, handleReqError } = require('../../helpers')

// const verify = async (req, res, next) => {
//     const { verificationToken } = req.params

//     const user = await User.findByVerifyToken(verificationToken)

//     if (!user) {
//         return next(HttpError(404, 'User not found'))
//     }

//     // await User.updateVerifyToken(user._id, { verify: true }, null /* verificationToken: '' */)
//     /* OR */
//     await User.updateVerifyToken(user._id, { verify: true, verificationToken: '' })

//     res.json({
//         message: 'Verification successful'
//     })
// }

// module.exports = handleReqError(verify)


const User = require('../../models/users')
const { HttpError, handleReqError } = require('../../helpers')

const verify = async (req, res, next) => {
    const { email } = req.body

    const user = await User.updateVerifyToken(email)

    if (!user) {
        return next(HttpError(404, 'User not found'))
    }
    if (user.verify) {
        return next(HttpError(400, 'Verification has already been passed'))
    }

    return res.status(200).json({
        message: 'Verification successful'
    })
}

module.exports = handleReqError(verify)