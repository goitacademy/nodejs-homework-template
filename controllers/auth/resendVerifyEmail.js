const {basedir} = global
const {PORT} = process.env
const User = require(`${basedir}/models/user`)
const sendEmail = require(`${basedir}/helpers/sendEmail`)

const resendVerifyEmail = async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).json({ status: 'error', code: 404, message: 'User not found!'})
    }
    if(user.verify) {
        return res.status(400).json({ status: 'error', code: 400, message: 'Verification has already been passed!'})
    }
    const mailConfirm = {
        to: email,
        subject: 'Website registration confirmation',
        html: `<a target="_blank" href="http://localhost:${PORT}/api/auth/verify/${user.verificationToken}>Сlick to confirm registration</a>`
    }
    await sendEmail(mailConfirm)
    res.status(200).json({ status: 'success', code: 200, message: 'Verification email sent!'})
}

module.exports = resendVerifyEmail