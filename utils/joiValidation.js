const Joi = require('joi');

function joiValidationRequired ({name, email, phone}) {
    const schema = Joi.object({
        name: Joi.string().pattern(new RegExp(/^[A-Za-zА-Яа-я0-9\s']+$/)).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(new RegExp(/^[0-9\s\(\)]+$/)).required()
      })

      const {error} = schema.validate({name, email, phone});

      return error;
}

function joiValidation (obj) {
    const schema = Joi.object({
        name: Joi.string().pattern(new RegExp(/^[A-Za-zА-Яа-я0-9\s']+$/)).allow('').optional(),
        email: Joi.string().email().allow('').optional(),
        phone: Joi.string().pattern(new RegExp(/^[0-9\s\(\)\-]+$/)).allow('').optional()
      })

      const {error} = schema.validate(obj);

      return error;
}

module.exports = {
    joiValidation,
    joiValidationRequired,
};