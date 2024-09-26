const Joi = require('joi');

const schemaParams = Joi.object({contactId: Joi.string().min(3).max(30).required()});
module.exports = schemaParams;