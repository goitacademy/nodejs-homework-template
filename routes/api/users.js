const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()

router.post('/signup', async (req, res) => {
    // ... (twoje istniejące operacje)

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ user: { email, subscription: 'starter' } })
})

router.post('/login', async (req, res) => {
    // ... (twoje istniejące operacje)

    if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, 'yourSecretKey', {
            expiresIn: '1h',
        })
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            token,
            user: { email, subscription: 'starter' },
        })
    }
})

router.get('/current', authMiddleware, async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: 'Not authorized' })
        }
        const { email, subscription } = user
        return res.status(200).json({
            email,
            subscription,
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router
