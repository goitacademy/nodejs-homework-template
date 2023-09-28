const addSchema = require("../utils/validation/contactValidationSchemas");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");

const listContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw new HttpError(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.query);

    if (error) {
      throw new HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.query);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);

    if (!result) {
      throw new HttpError(404, "Not Found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.query);

    if (error) {
      throw new HttpError(400, error.message);
    }

    const result = await contacts.updateContact(
      req.params.contactId,
      req.query
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
