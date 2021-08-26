const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')
const TokenService = require('./tokenService')
const fs = require('fs').promises
const UserDto = require("../dtos/userDto")
const uuid = require('uuid')
const MailService = require('./mailService')
const jimp = require('jimp')
const path = require('path')
require('dotenv').config()
class UserService {
    constructor() { }

    async registration(email, password) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw new Error(`user with ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await User.create({ email, password: hashPassword, activationLink })
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateToken({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw new Error("Некорректная ссылка активации")
        }
        user.isActivated = true;
        await user.save()
    }
    
    async login({ email, password }) {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw new Error("Неверный пароль")
        }
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateToken({ ...userDto })
        console.log(tokens);
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async getCurrentUser(refreshToken) {
        const { user } = await TokenService.findToken(refreshToken)
        const currentUser = await User.findById(user)
        if (!currentUser) {
            throw new Error("Пользователя не найдено")
        }
        return currentUser
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error("Пользователь не авторизован")
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw new Error("Пользователь не авторизован")
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({ ...userDto })
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async updateAvatar(refreshToken, file) {
        const pathFile = file.path
        const { user } = await TokenService.findToken(refreshToken)
        file.originalname = user + '.jpg'
        const img = await jimp.read(pathFile)
        await img
            .autocrop()
            .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
            .writeAsync(pathFile)
        
        await fs.rename(pathFile, path.join(process.env.USERS_DIR, file.originalname))
        console.log('PATH FILE', pathFile);
        const update = { avatarURL: path.join(process.cwd(), process.env.USERS_DIR, file.originalname) };
        const filter = { _id: user };
        const currentUser = await User.findOneAndUpdate(filter, update)
        return currentUser
    }
}

module.exports = new UserService();