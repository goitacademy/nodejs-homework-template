const contacts = require("../models/contacts");

const HttpError = require("../helpers/HttpError");

const {
  validateContactSchema,
  validateUpdateContactSchema,
} = require("../middlewares/ValidateShemas");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const searchedContact = await contacts.getContactById(contactId);
    if (!searchedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(searchedContact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = validateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message || "Bad request");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    if (!result) {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = validateUpdateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message || "Bad request");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (result) {
      res.json(result);
    } else {
      throw HttpError(404, "Not found");
    }
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
};
