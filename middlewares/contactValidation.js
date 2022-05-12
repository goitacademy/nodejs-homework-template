// middleware - это ф-ция которая может сделать промежуточный этап обработки нашего запроса
const Joi = require("joi");

const validateAddedContact = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(20).required(),
        favorite: Joi.boolean()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
};

const validateUpdatedContact = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().email(),
        phone: Joi.string().min(10).max(20).required(),
        favorite: Joi.boolean()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
};

module.exports = {
    validateAddedContact,
    validateUpdatedContact,
};