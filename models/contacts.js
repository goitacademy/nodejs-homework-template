const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { handleMongooseErr } = require('../helpers/handleMongooseErr');

const bookSchema = new Schema({
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
  favourite: {
    type: Boolean,
    default: false
  },
}, { versionKey: false, timestamps: true });

bookSchema.post('save', handleMongooseErr)

const JoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

const Book = model('book', bookSchema);

module.exports = {
  Book,
  JoiSchema
}