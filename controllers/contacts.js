const Joi = require("joi");
const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  getContactById,
  addContact,
  listContacts,
  updateContact,
  removeContact,
} = require("../models/contacts");

const addingSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
//
const getList = async (__, res) => {
  const result = await listContacts();
  if (!result) {
    throw HttpError(404, "Contacts not found");
  }
  res.status(200).json(result);
};
//
const getById = async (req, res) => {
  console.log(req.params.contactId);
  const result = await getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};
//
const add = async (req, res) => {
  const { error } = addingSchema.validate(req.body);
  console.log(error);
  if (error) {
    res.status(400).json({ error: error.message });
  }
  const result = await addContact(req.body);
  res.status(201).json(result);
};
//
const removeById = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json({
    message: "Contact Deleted",
  });
};
//
const updateById = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
  }
  const id = req.params.contactId;
  const result = await updateContact(id, req.body);
  res.status(200).json(result);
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
