const { Schema, model } = require("mongoose");
const Joi = require("joi")

const { handleMongooseError } = require("../helpers")

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
},
{
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string()
    .trim()
    .min(2)
    .max(10)
    .required()
    .messages({
      'string.base': `"name" must be a string`,
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should have a minimum length of {#limit}`,
      'any.required': `missing required "name" field`
    }),


    email: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': `"email" should be a type of 'text'`,
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `missing required "email" field`,
      "string.email": `"email" must be a valid email address`,
    }),



    phone: Joi.string()
    .trim()
    .regex(/^\+?[()\-\d]+$/)
    .min(9)
    .max(16)
    .required()
    .messages({
      "any.required": `missing required "phone" field`,
      "string.base": `"phone" must be a string`,
      "string.empty": `"phone" cannot be an empty field`,
      "string.pattern.base": `"phone" number is invalid`,
      "string.min": `"phone" number should have a minimum length of {#limit}`,
      "string.max": `"phone" number should have a maximum length of {#limit}`,
    }),
    favorite: Joi.boolean(),
  });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean()
    .required()
    .messages({
        "any.required": `missing field favorite`,
      }),
  });
  
  const schemas = {
    addSchema,
    updateFavoriteSchema,

  };

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};