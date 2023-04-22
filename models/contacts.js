// const fs = require('fs/promises')

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
const {Schema,model}= require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
    }
  },
  { versionKey: false }
);



const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
    "string.empty": `phone cannot be empty`,
    "string.base": `phone must be string`
  }),
  favorite: Joi.boolean(),
});
const putSchema = Joi.object({
  name: Joi.string().required().messages({
  "any.required": `missing fields`,
  
}),
email: Joi.string().required().messages({
  "any.required": `missing fields`,
}),
phone: Joi.string().required().messages({
  "any.required": `missing fields`,
}),})
  
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing required favorite field`}
    ),
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
const schemas = {
  addSchema,
  updateFavoriteSchema,
 putSchema 
  
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};