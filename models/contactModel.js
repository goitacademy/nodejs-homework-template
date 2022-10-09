const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const contactMongooseSchema = new Schema(
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
    },
  },
  { versionKey: false, timestamps: true }
);

contactMongooseSchema.post("save", handleSaveErrors);
// this method added function after database operation 'save'
// here we call helper function to correctly overdrive mongoose error on save

const Contact = model("contacts", contactMongooseSchema);

// ------------------------------- joi schemas start -------------------------------
const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
  favorite: Joi.boolean(),
}).or("email", "phone");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
}).or("name", "email", "phone");

const favorContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiSchemas = {
  addContactSchema,
  updateContactSchema,
  favorContactSchema,
};
// ------------------------------- joi schemas end ---------------------------------

module.exports = {
  Contact,
  joiSchemas,
};
