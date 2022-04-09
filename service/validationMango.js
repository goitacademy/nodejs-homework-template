const Joi = require('Joi');

Joi.objectId = require('joi-objectid')(Joi);

const validationMangoId = Joi.object({
    contactId: Joi.objectId().required(),
});

module.exports = validationMangoId;