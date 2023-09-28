const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError } = require("../helpers/HttpError");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
  }),
});

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
      throw new HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new HttpError(400, `Missing required fields`);
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const result = await contacts.addContact(
      req.body.name,
      req.body.email,
      req.body.phone
    );
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
      throw new HttpError(404, `Not found`);
    }
    res.json({
      message: `contact deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new HttpError(400, "missing fields");
    }
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw new HttpError(404, `Not found`);
    }
    res.json(result);
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
