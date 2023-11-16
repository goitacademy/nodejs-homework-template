const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const schemaContacts = new mongoose.Schema ({
 name: {
    type: String,
    required: [true, 'Set name for contact']
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
}, {versionKey: false, timestamps: true})


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


module.exports = {
   model: mongoose.model('Contact', schemaContacts),
   joiSchema,
   patchSchema,
 };