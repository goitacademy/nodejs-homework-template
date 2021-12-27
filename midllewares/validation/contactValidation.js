import Joi from "joi";
import mongoose from 'mongoose';
import {MIN_AGE, MAX_AGE} from '../../lib/constants'

const { Types } = mongoose;

const createSchema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional(),
})

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'age')

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

export const validatorCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: `Missing field ${err.message.replace(/"/g, '')} `})
    }
    next ()
}

export const validatorId= async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: 'Invalid ObjectId'})
    }
    next ()
}

export const validatorUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({message: 'Missing fields'})
        }
        return res.status(400).json({message: err.message})
    }
    next ()
}

export const validatorUpdateFavorite = async (req, res, next) => {
    try {
        await updateFavoriteSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({message: "Missing field favorite"})
        }
        return res.status(400).json({message: err.message})
    }
    next ()
}
