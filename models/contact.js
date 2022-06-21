const { modelNames } = require("mongoose");

const { Schema, model } = require("mongoose");

const contactSchema = Schema({
   name: String,
   email: String,
   phone: String,
   // favorite:
});

const Contact = model('contact', contactSchema);

modelNames.exports = Contact; 