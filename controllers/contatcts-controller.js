const contatctsServices = require('../models/contacts');
const { HttpError } = require('../helpers');
const Joi = require('joi');

const phoneRegex = /[\(\d{3}\)]? \d{3}-\d{4}/;

const addSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contatctsServices.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContatctById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contatctsServices.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContatct = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contatctsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContatctById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contatctsServices.removeContact();
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json({
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

const updateContatctById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contatctsServices.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContatctById,
  addContatct,
  deleteContatctById,
  updateContatctById,
};
