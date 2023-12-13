const { Schema, model } = require('mongoose');
const Joi = require("joi");
const nameRegex = /^[a-zA-Z]+$/;
const phoneRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})([\s.-]?)\d{3}([\s.-]?)\d{4}$/;



const contactSchema = new Schema({
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
        required: true,

    },
    
});
contactSchema.post("save", (error, data, next)=> {
        error.status = 400;
  next();
}) 
   
const addSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(nameRegex)).required().messages({
    'any.required': `Missing required name field`,
  }),

  email: Joi.string().required().messages({
    'any.required': `Missing required email field`,
  }),

  phone: Joi.string().pattern(new RegExp(phoneRegex)).required().messages({
    'any.required': `Missing required phone field`,
  }),

  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': `Missing field favorite` }),
});

const Contact = model("сontact", contactSchema);


module.exports = {
Contact,
  addSchema,
  updateFavoriteSchema,
}