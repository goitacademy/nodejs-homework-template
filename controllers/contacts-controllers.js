import Joi from "joi";

// import { listContacts, getContactById, addContact, removeContact, updateContact } from "../models/contacts.js";
import contactServise from "../models/contacts.js";

import HttpError from "../helpers/HttpError.js";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await contactServise.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactServise.getContactById(contactId);
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

const   createNewContact = async (req, res, next) => {
    try {
      const { error } = contactsAddSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
  
      const result = await contactServise.addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  const deleteById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactServise.removeContact(contactId);
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
  
      res.json({ message: "Delete Success" });
    } catch (error) {
      next(error);
    }
  }

  const updateContactById = async (req, res, next) => {
    try {
      const { error } = contactsAddSchema.validate(req.body);
  
      if (error) {
        throw HttpError(400, error.message);
      }
  
      const { contactId } = req.params;
      const result = await contactServise.updateContact(contactId, req.body);
  
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

export default {
  getAll,
  getById,
  createNewContact,
  deleteById,
  updateContactById,
};
