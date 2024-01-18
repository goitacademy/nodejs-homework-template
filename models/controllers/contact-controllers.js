import contactsService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import Joi from 'joi';

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
  phone: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
}); 

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}); 

export const getAll = async (req, res,next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    }
    catch (error){
            next(error)
        }
};

export const getById = async (req, res,next) => {
  try {
      const { contactId } = req.params;
      const result = await contactsService.getContactById(contactId);
      if (!result) {
          throw HttpError(404, `Not found`);
      }
      res.json(result);
  } catch (error) {
      next(error);
  }
};

export const addNewContact = async (req, res, next) => {
    try {
        const {error} = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }    
    const result = await contactsService.addContact(req.body) 
    res.status(201).json(result)    
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
      }
      const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
      if (!result) {
       throw HttpError(404, 'Not found');
      }
      res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `not found`);
        }
        res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

