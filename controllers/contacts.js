const Joi = require("joi");

const contacts = require("../models/contacts");

const HttpError = require("../utils/HttpError");

const addSchema = Joi.object().min(1).required();

const listContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = addSchema.validate({ name, email, phone });
    console.log(error);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const result = await contacts.addContact({ name, email, phone });
    console.log(result);
    res.status(201).json(result);
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
    res.status(200).json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    // const { name, email, phone } = req.body;
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
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
