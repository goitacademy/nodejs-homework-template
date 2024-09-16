const Joi = require("joi");
const httpError = require("../helpers/httpError");

const addSchema = Joi.object({
    name: Joi.string().label('name'),
    email: Joi.string().email().label('email'),
    phone: Joi.string().pattern(/^[0-9+() -]+$/).label('phone')
})
.or('name', 'email', 'phone').required()
.custom((value, helpers) => {
const missingFields = [];
if (!value.name) {
    missingFields.push('name');
}
if (!value.email) {
    missingFields.push('email');
}
if (!value.phone) {
    missingFields.push('phone');
}
if (missingFields.length > 0) {
    const missingFieldsStr = missingFields.join(', ');
    return helpers.message(`${missingFieldsStr} field is required`);
}
return value;
})
.options({
messages: {
    "string.empty": '{#label} cannot be empty',
    "string.base": '{#label} must be string',
},
});


const putSchema = Joi.object({
    email: Joi.string().email().allow(''),
    phone: Joi.string().pattern(/^[0-9+() -]+$/).allow(''),
    name: Joi.string().allow(''),
}).or('email', 'phone', 'name').required().messages({
    'object.missing': 'missing fields',
});

function validateAddContact(req, res, next) {
        const {error} = addSchema.validate(req.body);
        if(error) {
        throw httpError.HttpError(400, error.message);
    }
        next();
}

function validatePutContact(req, res, next) {
        const {error} = putSchema.validate(req.body);
        if(error) {
        throw httpError.HttpError(400, error.message);
    }
        next(); 
}

module.exports = {
    validateAddContact,
    validatePutContact,
    }