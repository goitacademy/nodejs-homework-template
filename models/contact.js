const {Schema, model} = require("mongoose");
// const Joi = require("joi");

// const {handleMongooseError} = require('../helpers');

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
// щоб не було запису в БД версії але не часу
{ versionKey: false, timestamps: true }
);

const Contact = model('contact', schema);

module.exports = Contact;