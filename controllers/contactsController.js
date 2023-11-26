// controllers/contactsController.js
const contactsModel = require('../models/contacts');
const contactSchema = require('../schemas/contactsSchema');
const updateContactSchema = require('../schemas/updateContactSchema');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsModel.getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { body } = req;

  try {
    const validationResult = contactSchema.validate(body);
    if (validationResult.error) {
      res.status(400).json({ message: 'Validation failed', error: validationResult.error.details });
      return;
    }

    const newContact = await contactsModel.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const removedContact = await contactsModel.removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.json({ message: 'Contact deleted', contact: removedContact });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const validationResult = updateContactSchema.validate(body);
    if (validationResult.error) {
      res.status(400).json({ message: 'Validation failed', error: validationResult.error.details });
      return;
    }

    const updatedContact = await contactsModel.updateContact(contactId, body);
    if (!updatedContact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
