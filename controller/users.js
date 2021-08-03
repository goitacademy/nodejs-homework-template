const User = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Jimp = require('jimp')

const fs = require('fs').promises
const path = require('path')

const secret = process.env.SECRET

const register = async (req, res, next) => {
    const { password, email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        res.json({
            message: 'conflict',
            status: 409,
            data: {
                result: 'email in use'
            }
        })
    }
    try {
        const newUser = new User({ email })
        newUser.setPassword(password)
        await newUser.save()
        res.status(201).json({
            message: 'success',
            status: 201,
            data: {
                result: 'user registration successful',
                user: newUser
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 400,
            message: 'Incorrect login or password',
            data: 'Bad request'
        })
    }
    const id = user.id
    const payload = {
        id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    await User.findByIdAndUpdate(id, { token }, { new: true })
    res.json({
        status: 'success',
        code: 200,
        data: {
            token: token,
            user: {
                email: user.email,
                subscription: user.subscription,
                token: token
            }
        }
    })
}

const logout = async (req, res, next) => {
    const id = req.user.id
    const token = null
    await User.findByIdAndUpdate(id, { token }, { new: true })

    return res.json({
        status: 204,
        message: 'logout complete'
    })
}

const currentUser = async (req, res, next) => {
    return res.json({
        status: 204,
        message: 'success',
        data: {
            email: req.user.email,
            subscription: req.user.subscription
        }
    })
}

const updateAvatar = async (req, res, next) => {
    let avatarURL
    if (req.file) {
        const imgDir = path.join(process.cwd(), 'public/avatars')
        const newNameAvatar = `${Date.now()}-${req.file.originalname}`

        const img = await Jimp.read(req.file.path)
        await img
            .autocrop()
            .cover(
                250,
                250,
                Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
            )
            .writeAsync(req.file.path)
        await fs.rename(req.file.path, path.join(imgDir, newNameAvatar))
        avatarURL = path.join(newNameAvatar)
    }

    try {
        const id = String(req.user._id)

        await User.updateOne({ _id: id }, { avatarURL })

        return res.json({
            status: 'success',
            code: 200,
            data: {
                avatarURL
            }
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { register, login, logout, currentUser, updateAvatar }