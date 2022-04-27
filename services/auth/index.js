const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')
const EmailService = require('../email/service')
const SendlerNodemailer = require('../email/senders/sendgrid-sendler')
const SenderSendGrid = require('../email/senders/sendgrid-sendler')
// const User = require('../../models/user')

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async create(body) {
        const user = await Users.findByEmail(body.email)
        if (user) {
            throw new CustomError(HTTP_STATUS_CODE.CONFLICT, 'User already exists')
        }

        const newUser = await Users.create(body)
                const sender = new SenderSendGrid()
        const emailService = new EmailService(sender)
        try {
            await emailService.sendEmail(newUser.email, newUser.name, newUser.verifyEmailToken)

        } catch (error) {
          console.log(error)
        }
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
        }
    }
    async login({ email, password }) {
        const user = await this.#getUser(email, password)
        const token = this.#generateToken(user)
        await Users.updateToken(user.id, token)
        return { token }
    }
    async logout(id) {
        await Users.updateToken(id, null)
    }
    
    async #getUser(email, password) {
        const user = await Users.findByEmail(email)

        if (!user) {
             throw new CustomError(
                HTTP_STATUS_CODE.NOT_FOUND,
                'User not found',
            )
        }

        if (!(await user?.isValidPassword(password))) {
             throw new CustomError(
                HTTP_STATUS_CODE.UNAUTHORIZED,
                'Invalid credentials',
            )
        }

        if (!user?.isVerify) {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, 'User is not verified')
        }

        return user
    }

    #generateToken(user) {
        const payload = { id: user.id }
        console.log(SECRET_KEY)
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        return token
    }

    async verifyUser(token) {
        const user = await User.findByToken(token)
        if (!user) {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, 'Invalid token')
        }
        if (!user && user.isVerify) {
            throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, 'User already verified')
        }
        await Users.verifyUser(user.id)
        return user
    }
    async reverifyEmail(email) {
        const user = await Users.findByEmail(email)
        if (!user) {
            throw new CustomError(
                HTTP_STATUS_CODE.NOT_FOUND,
                'User not found'
            )
        }

        if (!user && user.isVerify) {
            throw new CustomError(
                HTTP_STATUS_CODE.BAD_REQUEST,
                'User already verufied',
            )
        }
        
    }
}

module.exports = new AuthService()