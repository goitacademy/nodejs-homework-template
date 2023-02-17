const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const {
  contactsSchema,
  contactsUpdateSchema,
} = require("../middleware/contactsValidation");

const { createError } = require("../utils/createError");
const { createResult } = require("../utils/createResult");

const getListContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    createResult(res, contacts);
  } catch (error) {
    next(error);
  }
};
const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    createResult(res, { ...result });
  } catch (error) {
    next(error);
  }
};
const addNewContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addContact(req.body);
    res.status(201);
    createResult(res, result);
  } catch (error) {
    next(error);
  }
};
const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    createResult(res, result, `Contact with id=${contactId} deleted`);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw createError(400, `missing fields`);
    }
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    createResult(res, result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts,
  getContact,
  removeContactById,
  addNewContact,
  updateContactById,
};
