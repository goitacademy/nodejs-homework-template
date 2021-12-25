import Joi from 'joi';
import mongoose from 'mongoose';
const { Types } = mongoose;

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'favorite',);

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
});

export const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: 'missing fields' });
    }
    next();
};

export const validateUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body);
    } catch (error) {
        const [{ type }] = error.details;
        (type === 'object.missing') ?
            res.status(400).json({ message: 'missing fields' }) :
            res.status(400).json({ message: error.message });
    }
    next();
};

export const validateUpdateFavorite = async (req, res, next) => {
    try {
        await updateFavoriteSchema.validateAsync(req.body);
    } catch (error) {
        const [{ type }] = error.details;
        (type === 'object.missing') ?
            res.status(400).json({ message: 'missing fields favorite' }) :
            res.status(400).json({ message: error.message });
    }
    next();
};

export const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({message: 'Invalid ObjectId'})
    }
    next();
};
