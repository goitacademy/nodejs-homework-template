const {basedir} = global
const {PORT} = process.env
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid');
const sendEmail = require(`${basedir}/helpers/sendEmail`)
const User = require(`${basedir}/models/user`)

const register = async (req, res) => {
    const {email, password} = req.body
    const mail = await User.findOne({email})
    if(mail) {
        return res.status(409).json({ status: 'error', code: 409, message: `User with ${email} is already exist!`})
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const verificationToken = uuidv4()
    const user = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken})
    const mailConfirm = {
        to: email,
        subject: 'Website registration confirmation',
        html: `<a target="_blank" href="http://localhost:${PORT}/api/auth/verify/${verificationToken}>Сlick to confirm registration</a>`
    }
    await sendEmail(mailConfirm)
    res.status(201).json({ status: 'success', code: 201, data: {email: user.email, subscription: user.subscription, token: user.verificationToken}})
}

module.exports = register