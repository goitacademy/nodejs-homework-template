const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[0-9]{9}$/;

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    unique: true,
  match: codeRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
{ versionKey: false, timestamps: true })





const joiSchema = Joi.object({
   name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.string().pattern(codeRegexp).required(),
  favorite: Joi.boolean().required()
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const Contact = model("contacts", contactSchema);

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact
}