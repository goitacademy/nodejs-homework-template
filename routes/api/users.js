const express = require('express')
// const { bodySchema } = require('./validation')
const { userSchema } = require('./validation-user')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../schemas/users')

router.post('/registration', async (req, res) => {
    /* eslint-disable no-unused-vars */
    const { error, value } = userSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ err: error.details.map(err => err.message) })
    }

    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ message: "Email in use" })
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
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router