const contactCheckSchema = require("../schemas/contacts-schemas");
const { HttpError } = require("../helpers");
const contacts = require("../models/contacts");

const getListContacts = async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactCheckSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) throw HttpError(404);
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactCheckSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts: getListContacts,
  getContactById: getContactById,
  addContact: addContact,
  removeContact: removeContact,
  updateContact: updateContact,
};
