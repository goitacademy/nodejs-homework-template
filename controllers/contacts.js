const Joi = require("joi");

const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().max(30).required(),
});

const getAll = async (req, res) => {
  const data = await contacts.listContacts();
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const id = req.params;
  const data = await contacts.getById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message );
  }
  const data = await contacts.addContact(req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(404, error.message );
  }
  const id = req.params;
  const data = await contacts.updateContact(id, req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

const deleteById = async (req, res) => {
  const id = req.params;
  const data = await contacts.removeContact(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
