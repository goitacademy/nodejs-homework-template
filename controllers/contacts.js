const { HttpError, ctrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");
const Joi = require("joi");
const AddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const UpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
const addContact = async (req, res) => {
  const { error } = AddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "missing fields");
  }
  const { error } = UpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({
    message: "Delete success",
  });
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
