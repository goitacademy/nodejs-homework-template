import Joi from 'joi'
import { HttpCode } from '../../../lib/constants'

const forSignup = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const forLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})


export const validateSignup = async (req, res, next) => {
    try {
       await forSignup.validateAsync(req.body)
    } catch (err) {
        return res.status(HttpCode.BAD_REQUEST).json({message: err.message })
    }
    next()
}

export const validateLogin = async (req, res, next) => {
    try {
       await forLogin.validateAsync(req.body)
    } catch (err) {
        return res.status(HttpCode.BAD_REQUEST).json({message: err.message })
    }
    next()
}