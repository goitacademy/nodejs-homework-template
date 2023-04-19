const Joi = require("joi");
const contacts = require("../models/contacts");
const { HTTPError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
});

const getAll = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw HTTPError(404, "Not Found");
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addSchema.validate(body);
    console.log(error);
    if (error) {
      throw HTTPError(400, error.message);
    }
    const contact = await contacts.addContact(body);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
      throw HTTPError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addSchema.validate(body);
    console.log(error);
    if (error) {
      throw HTTPError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId, body);
    if (!contact) {
      throw HTTPError(404, "Not Found");
    }
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
};
