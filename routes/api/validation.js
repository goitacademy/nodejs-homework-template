import Joi from 'joi';
import mongooseService from 'mongoose';

const { Types } = mongooseService;

const createSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone');

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
});

export const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body);
    } catch (err) {
        return res
            .status(400)
            .json({ message: `Field ${err.message.replace(/"/g, '')}` });
    }
    next();
};

export const validateUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body);
    } catch (err) {
        const [{ type }] = err.details;
        if (type === 'object.missing') {
            return res.status(400).json({ message: 'missing fields' });
        }
        return res.status(400).json({ message: err.message });
    }
    next();
};

export const validateUpdateFavorite = async (req, res, next) => {
    try {
        await updateFavoriteSchema.validateAsync(req.body);
    } catch (err) {
        const [{ type }] = err.details;
        if (type === 'object.missing') {
            return res.status(400).json({ message: 'missing field favorite' });
        }
        return res.status(400).json({ message: err.message });
    }
    next();
};

export const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    next();
};