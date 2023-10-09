const contacts = require("../models/contacts.js");
const HttpError = require("../helpers/HttpError");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
});

const getAll = async (req, res, next) => {
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
    if (!result) throw HttpError(404, "Contact Not Found!");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
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
    if (!result) HttpError(404, "Contact Not Found");
    res.json({ message: "Delete Successful" });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) HttpError(400, error.message);
    const { contactId } = req.params;
    console.log(contactId);
    const result = await contacts.updateContact(contactId, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getContactById, add, removeContact, update };
