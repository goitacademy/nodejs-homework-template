const { model, Schema } = require('mongoose');
const Joi = require('joi');
const  handleMongooseErr  = require('../helpers/handleMongooseErr');

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
    default: false
  },
}, { versionKey: false, timestamps: true });


contactSchema.post("save", handleMongooseErr);

const JoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const favoriteSchema = Joi.object({
  favorite:Joi.boolean().required()
})

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  JoiSchema, 
  favoriteSchema
}