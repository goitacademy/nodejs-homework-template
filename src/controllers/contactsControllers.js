const Joi = require('joi');
const { HttpError, contactSchema } = require('../helpers/');
const service = require('../models/contacts');

const addSchema = Joi.object(contactSchema);

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await service.getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);

    if (!contact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const validationResult = addSchema.validate(req.body);

    if (validationResult.error) {
      throw HttpError(400, validationResult.error.message);
    }

    const createdContact = await service.addContact(req.body);
    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await service.updateContact(contactId, req.body);
    const validationResult = addSchema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing fields');
    }

    if (validationResult.error) {
      throw HttpError(400, validationResult.error.message);
    }

    if (!updatedContact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await service.removeContact(contactId);

    if (!deletedContact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.status(200).json({
      message: 'contact deleted',
      contact: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactController,
  addContactController,
  updateContactController,
  removeContactController,
};
