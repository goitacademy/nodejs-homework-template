const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')
const TokenService = require('./tokenService')
const UserDto = require("../dtos/userDto")
const uuid = require('uuid')
const MailService = require('./mailService')

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
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const userDto = new UserDto(user) 
        const tokens = await TokenService.generateToken({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens,user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw new Error("Некорректная ссылка активации")
        }
        user.isActivated = true;
        await user.save()
    }
    
    async login({email, password}) {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw new Error("Неверный пароль")
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateToken({ ...userDto })
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
        // console.log('contacts', contacts);
        // return contacts
    }

    async getCurrentUser(refreshToken) {
        const {user} = await TokenService.findToken(refreshToken)
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
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();