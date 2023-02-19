const contacts = require("../models/contacts");
const Joi = require("joi");
const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const data = req.body;
  const { error } = addSchema.validate(data);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(data);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const upDateById = async (req, res, next) => {
  const data = req.body;
  const { error } = addSchema.validate(data);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, data);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  upDateById: ctrlWrapper(upDateById),
};
