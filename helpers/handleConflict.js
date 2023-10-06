const User = require('../models/schemas/users')
const bcrypt = require('bcrypt')

const handleConflict = async (req, res, email, password) => {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ message: 'Email in use' })
    }

    const saltIter = 10
    const hashPass = await bcrypt.hash(password, saltIter)

    const newUser = new User({
        email,
        password: hashPass,
        subscription: 'starter',
    })

    try {
        await newUser.save()
        return res.status(201).json({ user: newUser })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = handleConflict