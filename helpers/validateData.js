const Joi = require('joi');
const RequestError = require('./RequestError');

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required(),
});

const validateData = (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
        const field = error.details[0].path[0];
        throw RequestError(400, `missing required ${field} field`)
    }

    next();
}

module.exports = validateData;