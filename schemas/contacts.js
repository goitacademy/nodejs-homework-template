const Joi = require("joi");

const addSchema = Joi.object().custom((value, helpers) => {
    if (Object.keys(value).length === 0) {
      return helpers.error('object.empty');
    }
    
    const keys = ['name', 'email', 'phone'];
    const missingKeys = keys.filter(key => !Object.prototype.hasOwnProperty.call(value, key));
    
    if (missingKeys.length > 0) {
      return helpers.error('object.missingKeys', { missingKeys });
    }
    
    return value;
  }).messages({
    'object.empty': 'missing fields',
    'object.missingKeys': 'missing required fields: {{#missingKeys}}',
});

module.exports = {
    addSchema,
}