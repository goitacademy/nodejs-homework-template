const contactMethods = require("../models/contacts");

const contactSchema = require("../schemas/contacts");

const httpError = require("../helpers/httpError");

const listContacts = async (req, res, next) => {
  try {
    const result = await contactMethods.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactMethods.getContactById(contactId);
    if (!result) {
      throw httpError(404, "Not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const verifiedResult = contactSchema.validate(req.body);
    if (verifiedResult.error !== undefined) {
      throw httpError(400, "missing required name field");
    }
    const reqBody = verifiedResult.value;
    const result = await contactMethods.addContact(reqBody);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactMethods.removeContact(contactId);
    if (!result) {
      throw httpError(404, "Not found!");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const verifiedResult = contactSchema.validate(req.body);
    if (verifiedResult.error !== undefined) {
      throw httpError(400, "missing fields");
    }
    const reqBody = verifiedResult.value;
    const result = await contactMethods.updateContact(contactId, reqBody);
    if (!result) {
      throw httpError(404, "Not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
