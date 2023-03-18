const Joi = require("joi");
const {catchAsync} =require("../helpers/catchAsync")
const Contact=require("../models/contactsModel")
const {
    Types: { ObjectId },
  } = require('mongoose');

  const contactSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': `missing required name field`
      }),
    email: Joi.string().email().required().messages({
        'any.required': `missing required email field`
      }),
    phone: Joi.number().required().messages({
        'any.required': `missing required phone field`
      }),
  });
  const validateContact = async (req, res, next) => {
    const { error,value } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    req.body = value;
    next();
  };

const checkContactId = catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
  
    // check if id is valid
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message:'Invalid Contact id..'  }); 
    }
  
    // check if contact with this id exists in DB
    const contactExists = await Contact.exists({ _id: contactId });
  
    if (!contactExists) return res.status(404).json({ message:'Contact not found..' })
    next();
  });


  module.exports = {
    checkContactId,
    validateContact
  };