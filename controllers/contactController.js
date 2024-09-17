const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  try {
    const resultContacts = await contacts.listContacts();
    res.json(resultContacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultContact = await contacts.getContactById(contactId);
    if (!resultContact) {
      throw HttpError(404, "Not found");
    }
    res.json(resultContact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultContact = await contacts.updateContact(contactId, req.body);
    if (!resultContact) {
      throw HttpError(404, "Not found");
    }
    res.json(resultContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
