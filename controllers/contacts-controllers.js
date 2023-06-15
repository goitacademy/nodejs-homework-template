const contactsService = require('../models/contacts/contacts');

const HttpError = require('../helpers/HttpError');

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);

    if (result) {
      res.status(200).json({ message: 'contact deleted' });
    } else {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const result = await contactsService.updateContactById(id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
};
