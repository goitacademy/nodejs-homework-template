const contacts = require("../models/contacts.json");
const Joi = require("joi");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required().required(),
  email: Joi.string().required().required(),
  phone: Joi.string().required().required(),
});

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  console.log(contacts.listContacts());
  res.status(200).json(result);
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, { message: "missing required name field" });
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(200, { message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, { message: "missing fields" });
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
