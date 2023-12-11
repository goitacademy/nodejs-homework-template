const {Schema, model} = require('mongoose');
const {handleMongooseError} = require('../helpers');
const Joi = require("joi");


const contactSchema = new Schema ({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey : false, timestamps : true});

  contactSchema.post("save", handleMongooseError);

  const addSchema = Joi.object({
    name:Joi.string().required().messages({ 'any.required': 'missing required name field' }),
    email:Joi.string().required().messages({ 'any.required': 'missing required email field' }),
    phone:Joi.string().required().messages({ 'any.required': 'missing required phone field' }),
    favorite : Joi.boolean()
  })

  const updateSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(5).max(15),
    favorite: Joi.boolean(),
  })
    .min(1)
    .messages({ 'object.min': 'missing fields' });

  const updateFavoriteSchema = Joi.object({
    favorite : Joi.boolean().required().messages({ "any.required": "missing field favorite" }),
  })

  const schemas = {
    addSchema,
    updateFavoriteSchema,
    updateSchema
  }
const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas
};