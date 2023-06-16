const {Schema, model} = require('mongoose');
const {handleMongooseError} = require('../helpers');
const Joi = require('joi');

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
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {
    versionKey: false,
    timestamps: true
});

contactSchema.post('save', handleMongooseError);

const contactAddSchema = Joi.object({
    name: Joi.string().messages({
        'any.required': `missing required name field`
    }).required(),
    email: Joi.string().email().messages({
        'any.required': `missing required email field`
    }).required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({
        'any.required': `missing required phone field`
    }).required(),
    favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().messages({
    'any.required': `missing field favorite`
}).required(),
})

const schemas = {
  contactAddSchema,
  updateFavoriteSchema
}

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};