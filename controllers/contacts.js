const contacts = require("../models/contacts");
const { HttpError } = require("../utils");
const Joi = require("joi");
const ctrlWrapper = require("../utils/ctrl.Wrapper");

const AddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const getContacts = async (req, res, next) => {
  const result = await contacts.getContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required name field");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const updateById = async (req, res, next) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required name field");
  }
  const { id } = req.params;
  const result = await contacts.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateById: ctrlWrapper(updateById),
};
