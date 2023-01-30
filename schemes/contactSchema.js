const Joi = require('joi');

const contactSchema = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(5).max(40).email().required(), 
        phone: Joi.string().length(14).pattern(/^[\(\- ]*\d{3}[\)-\. ]*\d{3}[-\. ]*\d{4}$/).required()
});

module.exports = contactSchema;