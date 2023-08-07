const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const userService = require('../service/users.service')

require('dotenv').config()

const SALT_ROUNDS = +process.env.SALT_ROUNDS
const JWT_KEY = process.env.JWT_KEY

const registerUser = async (req, res) => {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)

    if (user?.email) return res.status(409).json({ message: 'Email in use' })

    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashPassword = await bcrypt.hash(password, salt)

    const avatarURL = gravatar.url(user?.email)

    const { subscription } = await userService.createUser({
        ...req.body,
        password: hashPassword,
        avatarURL,
    })

    return res.json({ user: { email, subscription } }).status(201)
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)

    if (!user) {
        return res.status(401).json({ message: 'Email or password is wrong' })
    }

    const isValidPassword = await bcrypt.compare(password, user?.password)

    if (!isValidPassword) {
        return res.status(401).json({ message: 'Email or password is wrong' })
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, JWT_KEY, { expiresIn: '24h' })
    const updatedUser = await userService.updateUser(user.id, { token })

    return res
        .json({
            token,
            user: {
                email: updatedUser.email,
                subscription: updatedUser.subscription,
            },
        })
        .status(201)
}

const logoutUser = async (req, res) => {
    const { _id } = req.user

    await userService.updateUser(_id, { token: null })

    return res.sendStatus(204)
}

const currentUser = async (req, res) => {
    const { email, subscription } = req.user

    return res.json({ email, subscription }).status(200)
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user

    const avatarUrl = await userService.updateAvatar(_id, req.file)
    await userService.updateUser(_id, { avatarUrl })

    return res.json({ avatarURL: avatarUrl }).status(200)
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    updateAvatar,
}
