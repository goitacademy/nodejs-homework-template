const Joi = require('joi');
const RequestError = require('./RequestError');

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const validateData = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const field = error.details[0].path[0];
        throw RequestError(400, `Missing required ${field} field`);
    }
    next();
}

module.exports = validateData;