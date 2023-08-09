const {Schema, model}=require('mongoose')
const Joi=require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegexp=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp=/^\+?(\d{1,4})?\s?(\d{3,4})?\s?(\d{2,4})\s?(\d{2})\s?(\d{2})$/

const contactSchema=new Schema({
    name: {
        type: String,
        minLength: [3, 'Min length should be 3'],
        maxLength:[25, 'Max length should be 25'],
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        match: [emailRegexp, 'Enter correct email'],
        required: [true, 'Set email'],
        unique: true, 
      },
      phone: {
        type: String,
        match:[phoneRegexp, 'Enter phoneNumber in format "+3809322..." or "3809322..."'],
        required: [true, 'Set phoneNumber']
      },
      favorite: {
        type: Boolean,
        default: false,
      },
}, {versionKey: false, timestamps: true})

// if unique
contactSchema.post('save', handleMongooseError)

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is required',
  }),
  email:Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'Email should be a string',
    'string.empty': 'Email cannot be empty',
    'string.pattern.base':'Enter correct email',
    'any.required': 'Email is required',
  }),
  phone:Joi.string().pattern(phoneRegexp).required().messages({
    'string.base': 'Phonenumber should be a string',
    'string.empty': 'Phonenumber cannot be empty',
    'string.pattern.base':'Enter phoneNumber in format "+3809322..." or "3809322..."',
    'any.required': 'Phonenumber is required',
  }),
  favorite:Joi.boolean().messages({
    'boolean.base':'It should be boolean'
  })
      })

const updateFavoriteSchema=Joi.object({
  favorite:Joi.boolean().required().messages({
    'boolean.base':'It should be boolean',
    'any.required': 'Favorite is required',
  })
})

const schemas={
  addSchema,
  updateFavoriteSchema
}

const Contact=model('contact', contactSchema)


module.exports={
    Contact,
    schemas
}