const HttpError = require("../helpers/HttpError");
const isValidId = require("../helpers/isValidId");
const {
  getAll,
  getById,
  addContactToDB,
  updateContactById,
  deleteContactById,
  updateStatusContactById,
} = require("../models/contacts");
const { Contact } = require("../schemas/ValidateSchemasContacts");

const getAllContacts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const contacts = await getAll(page, limit);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    isValidId(contactId);
    const searchedContact = await getById(contactId);
    res.status(200).json(searchedContact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { email } = req.body;
    const IfUniqueEmail = await Contact.findOne({ email });
    if (IfUniqueEmail) {
      throw HttpError(400, "Email is already taken");
    }
    const newContact = await addContactToDB(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    isValidId(contactId);
    await deleteContactById(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    isValidId(contactId);
    const updatedContact = await updateContactById(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    isValidId(contactId);
    const { favorite } = req.body;
    const result = await updateStatusContactById(contactId, favorite);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
