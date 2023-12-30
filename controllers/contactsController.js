const ContactsOperations = require("../models/contacts.js");

const HttpError = require("../helpers/HttpError.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await ContactsOperations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await ContactsOperations.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const contact = await ContactsOperations.addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await ContactsOperations.removeContact(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await ContactsOperations.updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getById,
  addNewContact,
  deleteContact,
  updateContactById,
};
