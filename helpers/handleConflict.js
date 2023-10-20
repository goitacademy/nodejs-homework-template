const User = require('../models/schemas/users')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const handleConflict = async (req, res, email, password) => {
    const saltIter = 10
    const hashPass = await bcrypt.hash(password, saltIter)
    const avatarUrl = gravatar.url(email);

    const newUser = new User({
        email,
        password: hashPass,
        subscription: 'starter',
        avatarURL: avatarUrl || ''
    })

    try {
        await newUser.save()
        return res.status(201).json({ user: newUser })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = handleConflict