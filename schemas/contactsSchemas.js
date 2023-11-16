const Joi = require("joi");

// Joi Schema
const joiSchema = Joi.object({

    name: Joi.string()
    .min(4)
    .required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
 });
 
 const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
 });

 module.exports = {joiSchema, patchSchema}
 