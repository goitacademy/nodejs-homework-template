import Joi from 'joi';
import { ValidationError } from '../helpers/error.js';

const isValid = (schema, req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        throw new ValidationError(
            `Validation error: ${validationResult.error.message}`,
        );
    }
    next();
};

const addContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        phone: Joi.string().min(7).max(14).required(),
    });
    isValid(schema, req, res, next);
};
const updateContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        email: Joi.string().email({ minDomainSegments: 2 }),
        phone: Joi.string().min(7).max(14),
    });
    isValid(schema, req, res, next);
};
const updateStatusContactValidation = (req, res, next) => {
    const schema = Joi.object({
        favorite: Joi.boolean().required(),
    });
    isValid(schema, req, res, next);
};

const authValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).max(20).required(),
    });
    isValid(schema, req, res, next);
};

const verifyEmailValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
    });
    isValid(schema, req, res, next);
};

export {
    addContactValidation,
    updateContactValidation,
    updateStatusContactValidation,
    authValidation,
    verifyEmailValidation,
};
