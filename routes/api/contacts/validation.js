import Joi from 'joi'
import mongoose from 'mongoose';
import { MAX_AGE, MIN_AGE, HttpCode } from '../../../lib/constants';

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
}).or('name', 'email', 'phone','age')

const forPatchSchema = Joi.object({
    favorite: Joi.bool().required()
})

const regLimit = /\d+/

const querySchema = Joi.object({
    limit: Joi.string().pattern(regLimit).optional(),
    skip: Joi.number().min(0).optional(),
    sortBy: Joi.string().valid('name', 'age', 'email').optional(),
    sortByDesc: Joi.string().valid('name', 'age', 'email').optional(),
    filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('(name|age|email)\\|?(name|email|age)+'))
    .optional()
})

export const validateCreate = async (req, res, next) => {
    try {
       await forPostSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(HttpCode.BAD_REQUEST).json({message: err.message.replace(/"/g, '')})
    }
    next()
}

export const validateUpdate = async (req, res, next) => {
    try {
       await forUpdateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(HttpCode.BAD_REQUEST).json({message: err.message})
        }
        return res.status(HttpCode.BAD_REQUEST).json({message: 'missing fields'})
    }
    next()
}

export const validateUpdateFavorite = async (req, res, next) => {
    try {
       await forPatchSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(HttpCode.BAD_REQUEST).json({message: err.message})
        }
        return res.status(HttpCode.BAD_REQUEST).json({message: 'Missing fields favorite'})
    }
    next()
}

export const validateId = (req, res, next) => {
   if(!Types.ObjectId.isValid(req.params.contactId)){
    return res.status(HttpCode.BAD_REQUEST).json({message: 'Invalid ObjectId'})
   }
    next()
}

export const validateQuery = async (req, res, next) => {
    try {
       await querySchema.validateAsync(req.query)
    } catch (err) {
        return res
        .status(400)
        .json({message: err.message.replace(/"/g, '')})
    }
    next()
}