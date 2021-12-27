import Joi from 'joi'
import mongoose from 'mongoose';
import { MAX_AGE, MIN_AGE } from '../../../library/constants'

const { Types } = mongoose;

const forPostSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional()
})

const forUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional()
}).or('name', 'email', 'phone', 'age')

const forPatchSchema = Joi.object({
    favorite: Joi.bool().required()
})

export const validateCreate = async (req, res, next) => {
    try {
        await forPostSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({ message: err.message.replace(/"/g, '') })
    }
    next()
}

export const validateUpdate = async (req, res, next) => {
    try {
        await forUpdateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({ message: err.message })
        }
        return res.status(400).json({ message: 'missing fields' })
    }
    next()
}

export const validateUpdateFavorite = async (req, res, next) => {
    try {
        await forPatchSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({ message: err.message })
        }
        return res.status(400).json({ message: 'Missing fields favorite' })
    }
    next()
}

export const validateId = (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.contactId)) {
        return res.status(400).json({ message: 'Invalid ObjectId' })
    }
    next()
}