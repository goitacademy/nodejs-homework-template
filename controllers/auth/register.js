const {basedir} = global
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const User = require(`${basedir}/models/user`)

const register = async (req, res) => {
    const {email, password} = req.body
    const mail = await User.findOne({email})
    if(mail) {
        return res.status(409).json({ status: 'error', code: 409, message: `User with ${email} is already exist!`})
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const user = await User.create({...req.body, password: hashPassword, avatarURL})
    res.status(201).json({ status: 'success', code: 201, data: {email: user.email, subscription: user.subscription}})
}

module.exports = register