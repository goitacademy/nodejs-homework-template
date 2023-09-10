const contacts = require("../models/contacts.js");
const { HttpError } = require("../helpers");
const Joi = require("joi");
const { ctrWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .messages({ "string.pattern.base": `Phone number form (097)-000-0000` })
    .required(),
});

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
  res.status(200);
};

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required name field");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: ctrWrapper(listContacts),
  getContactsById: ctrWrapper(getContactsById),
  addContact: ctrWrapper(addContact),
  updateById: ctrWrapper(updateById),
  removeContact: ctrWrapper(removeContact),
};
