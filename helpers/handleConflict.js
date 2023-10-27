const User = require('../models/schemas/users')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
// const { createTransport, sendEmail } = require('../helpers/sendEmail')
const { randomUUID } = require('crypto')
// const { BASE_URL } = process.env

const handleConflict = async (req, res, email, password) => {
    const saltIter = 10
    const hashPass = await bcrypt.hash(password, saltIter)
    const avatarUrl = gravatar.url(email)
    const verificationToken = randomUUID()

    const newUser = new User({
        email,
        password: hashPass,
        verificationToken,
        subscription: 'starter',
        avatarURL: avatarUrl || ''
    })

    // const transporter = createTransport()
    // const verifyEmail = {
    //     to: email,
    //     subject: 'Сonfirm your registration',
    //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to confirm your registration</a>`,
    // }

    // await sendEmail(transporter, verifyEmail)

    try {
        await newUser.save()
        return res.status(201).json({ user: newUser })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = handleConflict