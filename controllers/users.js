const Users = require('../model/users')
const { HttpCode } = require('../helper/constants')
const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const EmailService = require('../services/email')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
 
const registration = async (req, res, next) => {
    const user = await Users.findEmail(req.body.email)
    
    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message:'Email is already use'
        })
    }

    try {
        const newUser = await Users.createUser(req.body)
        const { id, email, subscription, avatar, verifyTokenEmail } = newUser
        
        try {
            const emailService = new EmailService(process.env.NODE_ENV)
            await emailService.sendVerifyEmail(verifyTokenEmail, email)
        } catch (e) {
            console.log(e.message);
        }

        return res.status(HttpCode.CREATED).json({
            status: 'succes',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                avatar: newUser.avatar,
                subscription: newUser.subscription,
            }
        })
    } catch (error) {
        
    }
 }

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await Users.findEmail(email)
    const isValidPassword = await user?.validPassword(password)

    if (!user || !isValidPassword || !user.verify) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials'
        })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })

    await Users.updateToken(user.id, token)

    return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: { token }
    })

 }

const logout = async (req, res, next) => {
    const id = req.user.id  
    await Users.updateToken(id, null)

    return res.status(HttpCode.NO_CONTENT).json({
        status: 'error',
        code: HttpCode.NO_CONTENT,
        message: 'No Content'
    })
}

const current = async (req, res, next) => {
    const id = req.user.id
    const user = await Users.findById(id)
    return res.json({
        status: 'success',
        code: 200,
        data: {
            email: user.email,
            subscription: user.subscription,
            verify: user.verify,
        }
    })
   
}

const updateAvatar = async (req, res, next) => {
    const { id } = req.user
    const avatarUrl = await saveAvatarUser(req)
    await Users.updateAvatar(id, avatarUrl)
    return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
}

const saveAvatarUser = async (req) => {
    const FOLDER_AVATARS = process.env.FOLDER_AVATARS
    const pathFile = req.file.path
    const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
    const img = await jimp.read(pathFile)
    await img.autocrop(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile)
    try {
        await fs.rename(pathFile, path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar))
    } catch (error) {
        console.log(error.message);
    }
    
    try {
        const oldAvatar = req.user.avatar
        if (req.user.avatar.includes(`${FOLDER_AVATARS}/`)) {
        console.log('nene');
        await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
    }
    } catch (error) {
        console.log(error.message);
    }
    return path.join(FOLDER_AVATARS, newNameAvatar)
}

const verify = async (req, res, next) => {
    try {
        const user = await Users.findByVerifyTokenEmail(req.params.token)
        if (user) {
            return res.status(HttpCode.OK).json({
                status: 'succes',
                code: HttpCode.OK,
                data: { message: 'Verification saccessful' }
            })
        }
        return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Invalid token. Contact to administration'
    })
    } catch (error) {
        next(error)
    }
 }
const repeatEmailVerify = async (req, res, next) => {
    try {
        const user = await Users.findEmail(req.params.token)
        if (user) {
            const { email, verifyTokenEmail } = user
            const emailService = new EmailService(process.env.NODE_ENV)
            await emailService.sendVerifyEmail(verifyTokenEmail, email)
            return res.status(HttpCode.OK).json({
            status: 'succes',
            code: HttpCode.OK,
            data: { message:'Verification email resubmited' }
        })
        }
        return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'User not found'
    })
    } catch (error) {
        next(error)
    }
} 

module.exports = {
    registration,
    login,
    logout,
    current,
    updateAvatar,
    verify,
    repeatEmailVerify,
    // saveAvataruser,
}