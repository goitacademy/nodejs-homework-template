
const bcrypt = require("bcryptjs")
const gravatar = require('gravatar')
const idGenerate = require('bson-objectid')
const { User } = require("../../models/user")
const { createError, sendMail } = require("../../helpers")

const register = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user) {
        throw createError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)
    const verificationToken = idGenerate()
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">
            Нажмите для подтверждения Email
        </a>`
    }
    const result = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken})
    
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
    await sendMail(mail)
}

module.exports = register