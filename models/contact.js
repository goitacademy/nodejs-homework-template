
const { Schema, model } = require('mongoose');
const Joi = require('joi')

const {handleMongooseError} = require('../Utils')

const contactsSchema = new Schema(  {
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
})
  



const addSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
        
     email: Joi.string().required().email({ minDomainSegments: 2}),
            
    phone: Joi.number().integer().min(10),
    
    favorite: Joi.boolean()
      
})

const isFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required
})

const shemas = {
  addSchema,
  isFavoriteSchema
} 
    
contactsSchema.post('save', handleMongooseError)
const Contact = model("contact", contactsSchema);

module.exports = {
    Contact,
    shemas
};