const Joi = require('joi');

const addPostSchema = Joi.object({
    name: Joi.string().required,
    email: Joi.string().email().required,
    phone: Joi.string().required,
});

const patchPostSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
  });



module.exports = {
    addPostSchema,
    patchPostSchema
}