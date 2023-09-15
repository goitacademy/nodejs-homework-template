const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi') // Importujemy Joi
const User = require('../../models/models/users')
const auth = require('../../auth')

const router = express.Router()

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

router.post('/signup', async (req, res, next) => {
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.details[0].message })
    }

    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ user: { email, subscription: 'starter' } })
})

router.post('/login', async (req, res, next) => {
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.details[0].message })
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            token,
            user: { email, subscription: 'starter' },
        })
    } else {
        return res.status(400).json({ message: 'Invalid email or password' })
    }
})
router.get('/current', auth, async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({
                message: 'Not authorized',
            })
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

router.get('/logout', auth, async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({
                message: 'Not authorized',
            })
        }

        await User.findByIdAndUpdate(user._id, { token: null })
        return res.status(204).send() // 204 No Content
    } catch (error) {
        next(error)
    }
})

module.exports = router
