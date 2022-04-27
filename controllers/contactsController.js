const contactsOperations = require("../models/contacts");
const { createError } = require("../helpers");

const getContacts = async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contactsOperations.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContsct = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({ message: "contact delete" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  deleteContsct,
};
