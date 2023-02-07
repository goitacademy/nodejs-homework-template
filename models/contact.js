const { Schema, model } = require("mongoose");
const {
  addSchema,
  updFavoriteContactSchema,
} = require('../schemas/contactSchema');

const contactSchema = new Schema({
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
});

const schemas = {
  addSchema,
  updFavoriteContactSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};