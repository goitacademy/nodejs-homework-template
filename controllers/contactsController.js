const RequestError = require("../helpers/RequestError");
const contacts = require("../models/contacts");
const addSchema = require("../schemas/contacts");

const getContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact({ ...req.body, contactId });

    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ result, message: "Contact was updated" });
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json({ result, message: "contact was removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getById,
  addContact,
  updateById,
  removeById,
};
