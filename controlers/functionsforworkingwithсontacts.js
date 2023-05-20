const Joi = require("joi");
const contacts = require("../models/contacts");

const scheme = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

const getAllcontacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = scheme.validate(req.body);

    if (error) {
      const errors = new Error(error.message);
      error.status = 400;
      throw errors;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = scheme.validate(req.body);
    const bodyLength = Boolean(Object.keys(req.body).length);
    if (!bodyLength) {
      const errors = new Error("missing fields");
      error.status = 400;
      throw errors;
    }

    if (error) {
      const errors = new Error(error.message);
      error.status = 400;
      throw errors;
    }
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllcontacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
