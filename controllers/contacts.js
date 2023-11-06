const funcList = require("../models/contacts");
const Joi = require("joi");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (_, res) => {
  const contacts = await funcList.listContacts();
  res.status(200).json(contacts);
};
const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await funcList.getContactById(contactId);
  if (contact === null) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};
const postContact = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const newContact = await funcList.addContact(req.body);
  res.status(201).json(newContact);
};
const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await funcList.removeContact(contactId);
  if (contact === null) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
const putById = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const contact = await funcList.updateContact(contactId, req.body);
  if (contact) {
    res.status(200).json(contact);
  }

  throw HttpError(404, "Not found");
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  removeById: ctrlWrapper(removeById),
  putById: ctrlWrapper(putById),
};
