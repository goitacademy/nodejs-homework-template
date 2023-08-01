const Joi = require('joi');

const contacts = require('../models/contacts')

const {HttpError} = require('../helpers')

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
 })



 const getAll =  async (req, res, next) => {
        try {
        const allContacts = await contacts.listContacts();
        res.json(allContacts);
        } catch (error) {
          next(error);
        }
 }

 const getById = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const contactByID = await contacts.getContactById(contactId);
      if (!contactByID) {
        throw HttpError(404, 'Not Found');
      }
      res.json(contactByID)
    } catch (error) {
      next(error);
     
    } 
  }

  const add = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const newContact = await contacts.addContact(req.body);
      res.status(201).json(newContact)
    } catch (error) {
      next(error);
    }
  }

  const update =  async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        throw HttpError(404, 'Not Found');
      }
      res.json(result)
    } catch (error) {
      next(error);
    }
  }

  const remove = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result= await contacts.removeContact(contactId)
      if (!result) {
        throw HttpError(404, 'Not Found')
      }
      res.json(result)
    } catch (error) {
      next(error);
    }
  }


 module.exports= {
    getAll,
    getById,
    add,
    update,
    remove,
    
 }