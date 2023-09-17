const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const gravatar = require('gravatar') // Dodane dla obsługi Gravatara
const User = require('../../models/models/users')
const auth = require('../../auth')
const multer = require('multer')
const path = require('path')
const Jimp = require('jimp')
const fs = require('fs').promises
const router = express.Router()

const upload = multer({
    dest: 'tmp',
    limits: { fileSize: 2 * 1024 * 1024 }, // max 2 MB
})

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

    // Generowanie URL Gravatara
    const avatarURL = gravatar.url(
        email,
        { s: '100', r: 'x', d: 'retro' },
        true
    )

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Zapisywanie użytkownika z awatarem
    const newUser = new User({ email, password: hashedPassword, avatarURL })

    await newUser.save()

    res.status(201).json({
        user: { email, subscription: 'starter', avatarURL },
    })
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
router.patch(
    '/avatars',
    auth,
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const { file } = req
            if (!file) {
                return res.status(400).json({ message: 'No file provided' })
            }

            // Obróbka zdjęcia za pomocą Jimp
            const img = await Jimp.read(file.path)
            await img.resize(250, 250).writeAsync(file.path)

            // Przeniesienie pliku do folderu `public/avatars` i nadanie unikalnej nazwy
            const newName = `avatar_${req.user._id}${path.extname(
                file.originalname
            )}`
            const newLocation = path.join(
                __dirname,
                '../../public/avatars',
                newName
            )

            await fs.rename(file.path, newLocation)

            // Aktualizacja URL awatara użytkownika w bazie danych
            const avatarURL = `/avatars/${newName}`
            await User.findByIdAndUpdate(req.user._id, { avatarURL })

            res.status(200).json({ avatarURL })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
