
const contacts = require('../models/contacts');
const createHttpError = require('../helpers/HttpError');
const Joi = require('joi');


const schema = {
  add: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    
  }),
  update: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
  }).or("name", "phone", "email"),
};

const getContact =  async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error);
    
  }
};

const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createHttpError(404, 'Not found');
    }
    res.json(result);
  }
  catch (error) {
     next(error);
    }
};
  


const postContact = async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.message);
    }
    
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
};


const delContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);

        if (!result) {
            throw createHttpError(404, 'Not found');
        }
        res.json({ message: "contact deleted" })
    }
    catch (error) {
        next(error);
    }
};

const putContact = async (req, res, next) => {
  try { 
    if (!Object.keys(req.body).length) {
      throw createHttpError(400, 'missing fields');
    }
    const {error} = schema.update.validate(req.body);
    if (error) {
      throw createHttpError(400, error.message);
      }
      
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw createHttpError(404, 'Not found');
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
    getContact,
    getContactId,
    postContact,
    delContact,
    putContact
};