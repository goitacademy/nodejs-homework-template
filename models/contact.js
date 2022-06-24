const { Schema, model } = require("mongoose");

const Joi = require('joi');

const contactSchema = Schema({
   name: {
      type: String,
      required: [true, 'Set name for contact'],
   },
   email: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   favorite: {
      type: Boolean,
      default: false
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
   }
}, {versionKey: false, timestamps: true});

const schemaAdd = Joi.object({
   name: Joi.string().min(2).required(),
   email: Joi.string().required(),
   phone: Joi.string().required(),
   favorite: Joi.boolean(),
})
const schemaUpdate = Joi.object({
   name: Joi.string(),
   email: Joi.string(),
   phone: Joi.string(),
   favorite: Joi.boolean(),
   }).min(1)
const schemaPatch = Joi.object({
      favorite: Joi.boolean().required()
   })
const schemas = {
   schemaAdd,
   schemaUpdate,
   schemaPatch
}

const Contact = model('contact', contactSchema);

module.exports = {
   Contact,
   schemas
};