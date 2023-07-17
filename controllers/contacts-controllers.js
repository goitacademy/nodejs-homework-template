const Joi = require("joi");

const contactsService = require("../models/contacts.js");

const HttpError = require("../helpers/HttpError.js");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactsService.getContactById(contactId);
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
  
      const result = await contactsService.addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  const deleteById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactsService.removeContact(contactId);
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
      const result = await contactsService.updateContact(contactId, req.body);
  
      if (!result) {
        throw HttpError(404, `Contact with id ${contactId} not found`);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

module.exports = {
  getAll,
  getById,
  createNewContact,
  deleteById,
  updateContactById,
};
