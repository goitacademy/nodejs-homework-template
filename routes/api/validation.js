
const Joi = require('joi');

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

const validateUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: 'missing fields' });
    }
    next();
};
module.exports = { validateCreate, validateUpdate };